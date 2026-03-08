"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaChartLine, FaSearchPlus, FaHandsHelping,
  FaGraduationCap, FaMicrophone, FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

/* ── hook scroll ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(44px)",
        transition: `opacity .75s cubic-bezier(.22,1,.36,1) ${delay}s, transform .75s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── données services ── */
const SERVICES = [
  {
    slug: "consulting",
    icon: <FaChartLine />,
    color: "#3B82F6",
    badge: "Stratégie",
    title: "Consulting",
    desc: "Accompagnement personnalisé pour améliorer la performance de votre entreprise grâce à une approche structurée en 5 étapes.",
    points: ["Diagnostic & objectifs", "Feuille de route", "Conception & outillage"],
    num: "01",
  },
  {
    slug: "audit-sur-site",
    icon: <FaSearchPlus />,
    color: "#8B5CF6",
    badge: "Terrain",
    title: "Audit sur site",
    desc: "Analyse approfondie de vos processus et installations avec relevés terrain, interviews et rapport de conformité détaillé.",
    points: ["Brief & cadrage", "Visite & audit terrain", "Rapport & plan d'actions"],
    num: "02",
  },
  {
    slug: "accompagnement",
    icon: <FaHandsHelping />,
    color: "#F7B500",
    badge: "Suivi continu",
    title: "Accompagnement",
    desc: "Suivi personnalisé et continu par des experts dédiés pour soutenir chaque étape de la croissance de votre startup.",
    points: ["Coaching hebdomadaire", "Plans d'action personnalisés", "Reporting mensuel"],
    num: "03",
  },
  {
    slug: "formations",
    icon: <FaGraduationCap />,
    color: "#22C55E",
    badge: "Certification",
    title: "Formations",
    desc: "Programmes certifiants sur mesure pour vos équipes, délivrés par des experts reconnus dans leur domaine.",
    points: ["Présentiel & distanciel", "Certifications reconnues", "Mises en pratique réelles"],
    num: "04",
  },
  {
    slug: "podcasts",
    icon: <FaMicrophone />,
    color: "#EF4444",
    badge: "Contenus",
    title: "Podcasts",
    desc: "Épisodes exclusifs avec des entrepreneurs, experts et investisseurs pour vous inspirer et vous informer.",
    points: ["Épisodes bi-mensuels", "Experts invités", "Disponible partout"],
    num: "05",
  },
];

const STATS = [
  ["5",    "Services disponibles"  ],
  ["80+",  "Experts certifiés"     ],
  ["150+", "Startups accompagnées" ],
];

export default function ServicesPage() {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div className="font-[Plus_Jakarta_Sans,sans-serif] text-gray-700 min-h-screen bg-[#fafbff]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        @keyframes floatY {
          0%,100% { transform:translateY(-50%) rotate(45deg); }
          50%      { transform:translateY(calc(-50% - 14px)) rotate(45deg); }
        }
        @keyframes fadeSlideDown {
          from { opacity:0; transform:translateY(-12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .diamond-float { animation: floatY 7s ease-in-out infinite; }

        .svc-card {
          background: white;
          border-radius: 20px;
          border: 1.5px solid rgba(10,37,64,0.07);
          box-shadow: 0 4px 24px rgba(10,37,64,0.07);
          overflow: hidden;
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease, border-color .35s ease;
          display: flex;
          flex-direction: column;
        }
        .svc-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 24px 56px rgba(10,37,64,0.14);
          border-color: rgba(247,181,0,0.35);
        }

        .btn-voir {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0A2540; color: white;
          border: none; border-radius: 10px;
          padding: 11px 22px; font-size: 14px; font-weight: 700;
          cursor: pointer; text-decoration: none;
          transition: transform .22s ease, background .22s ease, box-shadow .22s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .btn-voir:hover {
          background: #F7B500; color: #0A2540;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(247,181,0,0.32);
        }

        .drop-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 18px; color: #0A2540;
          text-decoration: none; font-size: 14px; font-weight: 600;
          transition: background .15s;
        }
        .drop-item:hover { background: #FFFBEB; }

        .btn-conn {
          border: 2px solid #0A2540; color: #0A2540; background: transparent;
          padding: 9px 22px; border-radius: 9px; font-weight: 700; font-size: 14px;
          cursor: pointer; transition: all .22s; font-family: inherit;
        }
        .btn-conn:hover { background: #F7B500; border-color: #F7B500; transform: translateY(-2px); }

        .btn-insc {
          background: #F7B500; color: #0A2540; border: 2px solid #F7B500;
          padding: 9px 22px; border-radius: 9px; font-weight: 800; font-size: 14px;
          cursor: pointer; transition: all .22s; font-family: inherit;
        }
        .btn-insc:hover { background: #e6a800; transform: translateY(-2px); box-shadow: 0 8px 22px rgba(247,181,0,0.38); }
      `}</style>

      {/* ══ HEADER ══ */}
      <header
        className="bg-white sticky top-0 z-[100]"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <svg width="44" height="44" viewBox="0 0 46 46" fill="none">
              <rect width="46" height="46" rx="12" fill="#0A2540"/>
              <rect x="23" y="7" width="13" height="13" rx="2" transform="rotate(45 23 7)" fill="#F7B500" opacity="0.15"/>
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#F7B500" fontSize="15" fontWeight="900" fontFamily="Arial" letterSpacing="0.5">BEH</text>
            </svg>
            <div>
              <div className="font-black text-[18px] text-[#0A2540] leading-none tracking-[-0.4px]">
                Business <span className="text-[#F7B500]">Expert</span> Hub
              </div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.8px] mt-[3px]">
                Plateforme Experts &amp; Startups
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex gap-7 items-center">
            <Link href="/"        className="text-[#0A2540] no-underline text-[15px] font-medium transition-colors hover:text-[#F7B500]">Accueil</Link>
            <Link href="/a-propos" className="text-[#0A2540] no-underline text-[15px] font-medium transition-colors hover:text-[#F7B500]">À propos</Link>

            {/* dropdown Services */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <span className="text-[#F7B500] font-bold text-[15px] cursor-pointer">Services ▾</span>
              {servicesOpen && (
                <ul
                  className="absolute top-full left-0 bg-white rounded-xl min-w-[210px] list-none p-[8px_0] m-0 z-[200]"
                  style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)", animation: "fadeSlideDown .2s ease" }}
                >
                  {SERVICES.map(s => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="drop-item">
                        <span style={{ color: s.color, fontSize: 15 }}>{s.icon}</span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href="/experts" className="text-[#0A2540] no-underline text-[15px] font-medium transition-colors hover:text-[#F7B500]">Experts</Link>
            <Link href="/blog"    className="text-[#0A2540] no-underline text-[15px] font-medium transition-colors hover:text-[#F7B500]">Blog</Link>
            <Link href="/contact" className="text-[#0A2540] no-underline text-[15px] font-medium transition-colors hover:text-[#F7B500]">Contact</Link>
          </nav>

          {/* Boutons */}
          <div className="flex gap-3">
            <Link href="/connexion"><button className="btn-conn">Connexion</button></Link>
            <Link href="/inscription"><button className="btn-insc">{"S'inscrire"}</button></Link>
          </div>
        </div>
      </header>

      {/* ══ HERO ══ */}
      <section
        className="text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0A2540 0%,#0d3060 60%,#081B33 100%)", padding: "80px 24px 90px" }}
      >
        {/* Losanges déco */}
        {[
          { w: 360, right: -60,  delay: "0s"   },
          { w: 220, right: 80,   delay: "1.4s" },
          { w: 120, right: 130,  delay: "0.7s" },
        ].map((d, i) => (
          <div
            key={i}
            className="diamond-float absolute pointer-events-none"
            style={{
              width: d.w, height: d.w,
              right: d.right, top: "50%",
              transform: "translateY(-50%) rotate(45deg)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              animationDelay: d.delay,
            }}
          />
        ))}
        <div
          className="absolute pointer-events-none"
          style={{ bottom: -80, left: -80, width: 260, height: 260, transform: "rotate(45deg)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-[13px] text-white/50">
            <Link
              href="/"
              className="text-white/50 no-underline transition-colors hover:text-[#F7B500]"
            >
              Accueil
            </Link>
            <span>›</span>
            <span className="text-[#F7B500] font-semibold">Nos Services</span>
          </div>

          <span className="inline-block bg-[#F7B500] text-[#0A2540] font-black text-[12px] tracking-[3px] uppercase px-[18px] py-1.5 rounded-full mb-[22px]">
            Notre offre
          </span>

          <h1 className="font-black m-0 mb-5 leading-[1.1]" style={{ fontSize: "clamp(36px,5vw,60px)" }}>
            Nos <span className="text-[#F7B500]">Services</span>
          </h1>

          <p className="text-[18px] text-white/75 max-w-[620px] leading-[1.75] m-0">
            Notre plateforme propose plusieurs services destinés à accompagner les startups dans leur développement grâce à l&apos;expertise de professionnels qualifiés.
          </p>

          {/* Stats */}
          <div className="flex gap-10 mt-11 flex-wrap">
            {STATS.map(([v, l]) => (
              <div key={l}>
                <div className="text-[32px] font-black text-[#F7B500]">{v}</div>
                <div className="text-[13px] text-white/50 mt-[3px]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GRILLE SERVICES ══ */}
      <section className="py-[90px] px-6 max-w-[1200px] mx-auto">

        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="font-black text-[#0A2540] m-0 mb-3.5" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>
              Choisissez votre <span className="text-[#F7B500]">service</span>
            </h2>
            <p className="text-gray-500 text-[17px] max-w-[500px] mx-auto">
              Cliquez sur une carte pour découvrir le détail complet du service
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-3 gap-7">
          {SERVICES.map((svc, i) => (
            <FadeUp key={svc.slug} delay={i * 0.1}>
              <div className="svc-card h-full">

                {/* Bande couleur top */}
                <div
                  className="h-[5px]"
                  style={{ background: `linear-gradient(90deg,${svc.color},transparent)` }}
                />

                {/* Contenu */}
                <div className="p-8 flex-1 flex flex-col" style={{ padding: "36px 32px" }}>

                  {/* Icône + badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-[26px]"
                      style={{
                        background: `linear-gradient(135deg,${svc.color}22,${svc.color}44)`,
                        color: svc.color,
                        border: `1.5px solid ${svc.color}33`,
                      }}
                    >
                      {svc.icon}
                    </div>
                    <span className="bg-[#0A2540]/[0.06] text-gray-500 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-[1px]">
                      {svc.badge}
                    </span>
                  </div>

                  {/* Numéro + titre */}
                  <div className="flex items-baseline gap-2.5 mb-3">
                    <span
                      className="text-[12px] font-black tracking-[2px]"
                      style={{ color: `${svc.color}88` }}
                    >
                      {svc.num}
                    </span>
                    <h3 className="text-[22px] font-black text-[#0A2540] m-0">{svc.title}</h3>
                  </div>

                  <p className="text-gray-500 leading-[1.75] text-[15px] mb-6 flex-1">{svc.desc}</p>

                  {/* Points clés */}
                  <ul className="list-none p-0 m-0 mb-7 flex flex-col gap-2">
                    {svc.points.map((p, j) => (
                      <li key={j} className="flex items-center gap-2 text-[13px] text-gray-700 font-semibold">
                        <FaCheckCircle
                          className="flex-shrink-0 text-[13px]"
                          style={{ color: svc.color }}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* Bouton */}
                  <Link href={`/services/${svc.slug}`} className="btn-voir self-start">
                    Voir plus <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ══ CTA BANDE ══ */}
      <section className="bg-[#0A2540] py-[70px] px-6" />

      {/* ══ FOOTER ══ */}
      <footer className="bg-[#081B33] text-white py-7 px-6 text-center">
        <p className="m-0 mb-1.5 text-[14px]">© 2026 Business Expert Hub</p>
        <p className="text-white/40 text-[13px] m-0">Plateforme de mise en relation startups & experts</p>
      </footer>
    </div>
  );
}