"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import {
  FaBullseye,
  FaRocket,
  FaHandsHelping,
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaArrowRight,
  FaLock,
  FaCheck,
  FaUsers,
  FaAward,
  FaChartLine,
} from "react-icons/fa";

/* ══════════════════════════════════════════
   TYPES
══════════════════════════════════════════ */
interface AdnCard   { title: string; desc: string; icon: ReactNode; num: string; anchor: string; }
interface Expert    { name: string; role: string; xp: string; tags: string[]; rating: number; missions: number; initials: string; }
interface Partner   { name: string; sector: string; }
interface Testimony { quote: string; author: string; role: string; rating: number; }

/* ══════════════════════════════════════════
   HOOK
══════════════════════════════════════════ */
function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(48px)",
        transition: `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   DONNÉES
══════════════════════════════════════════ */
const adnCards: AdnCard[] = [
  {
    title: "Vision",  num: "01", anchor: "vision",
    icon: <FaBullseye />,
    desc: "Devenir la référence en accompagnement de startups innovantes, en connectant les meilleurs talents aux projets les plus ambitieux.",
  },
  {
    title: "Mission", num: "02", anchor: "mission",
    icon: <FaRocket />,
    desc: "Offrir aux startups un accès privilégié à des experts certifiés pour structurer leur stratégie, accélérer leur croissance et lever des fonds.",
  },
  {
    title: "Valeurs", num: "03", anchor: "valeurs",
    icon: <FaHandsHelping />,
    desc: "Excellence, transparence et engagement. Nous plaçons l'humain au cœur de chaque accompagnement pour un impact durable.",
  },
];

const experts: Expert[] = [
  { name: "Karim Benali",   role: "Expert Marketing Digital",        xp: "8 ans",  tags: ["Growth", "SEO", "Branding"], rating: 5, missions: 42, initials: "KB" },
  { name: "Sofia Mansouri", role: "Expert Finance & Levée de fonds", xp: "12 ans", tags: ["VC", "M&A", "CFO"],          rating: 5, missions: 67, initials: "SM" },
  { name: "Youssef Tazi",   role: "Expert Tech & Produit",           xp: "10 ans", tags: ["SaaS", "MVP", "Agile"],      rating: 5, missions: 55, initials: "YT" },
  { name: "Leila Osman",    role: "Expert RH & Management",          xp: "9 ans",  tags: ["Recrutement", "OKR"],        rating: 5, missions: 38, initials: "LO" },
];

const partners: Partner[] = [
  { name: "TechVentures",  sector: "Fonds d'investissement" },
  { name: "InnoHub",       sector: "Incubateur" },
  { name: "StartupNation", sector: "Accélérateur" },
  { name: "CapitalGrow",   sector: "Private Equity" },
  { name: "AfricaTech",    sector: "Réseau startup" },
  { name: "EuroFund",      sector: "Financement EU" },
  { name: "DigitalNext",   sector: "Transformation digitale" },
  { name: "GrowthLab",     sector: "Studio de croissance" },
];

const testimonials: Testimony[] = [
  { quote: "Grâce à Business Expert Hub, nous avons structuré notre stratégie en 3 semaines et levé 500k€ dès le trimestre suivant.", author: "Mehdi Charfi",    role: "CEO, Startup ABC",        rating: 5 },
  { quote: "Les experts Business Expert Hub ont transformé notre approche commerciale. Notre CA a doublé en 6 mois.",                 author: "Amira Khaled",   role: "Fondatrice, Startup XYZ", rating: 5 },
  { quote: "Un accompagnement sur mesure, réactif et vraiment efficace. Business Expert Hub est un vrai partenaire de croissance.",   author: "Bilel Trabelsi", role: "CTO, Startup Delta",      rating: 5 },
  { quote: "La mise en relation avec l'expert finance a été déterminante pour notre levée Série A.",                                  author: "Nour Ben Ali",   role: "COO, Startup Omega",      rating: 5 },
];

const navServices = [
  { label: "Consulting",     slug: "consulting"     },
  { label: "Audit sur site", slug: "audit-sur-site" },
  { label: "Accompagnement", slug: "accompagnement" },
  { label: "Formations",     slug: "formations"     },
  { label: "Podcasts",       slug: "podcasts"       },
];

const stats = [
  { num: "200+", label: "Startups accompagnées", icon: <FaUsers /> },
  { num: "50+",  label: "Experts certifiés",     icon: <FaAward /> },
  { num: "94%",  label: "Taux de satisfaction",  icon: <FaStar /> },
  { num: "12M€", label: "Levées facilitées",     icon: <FaChartLine /> },
];

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function Home() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [active, setActive]             = useState(0);
  const [animating, setAnimating]       = useState(false);
  const [email, setEmail]               = useState("");
  const [submitted, setSubmitted]       = useState(false);
  const [showModal, setShowModal]       = useState(false);

  useEffect(() => {
    const t = setInterval(() => { goTo((active + 1) % testimonials.length); }, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function goTo(idx: number) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActive(idx); setAnimating(false); }, 280);
  }

  function handleNewsletter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  }

  return (
    <div className="font-[Plus_Jakarta_Sans,sans-serif] text-gray-700">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta_Sans:wght@400;600;700;800;900&display=swap');

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: marquee 26s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }

        @keyframes floatY {
          0%, 100% { transform: translateY(-50%) rotate(45deg); }
          50%       { transform: translateY(calc(-50% - 16px)) rotate(45deg); }
        }
        .diamond-float { animation: floatY 6s ease-in-out infinite; }

        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-content > * {
          animation: heroFadeIn 0.85s cubic-bezier(.22,1,.36,1) both;
        }
        .hero-content > *:nth-child(1) { animation-delay: 0.1s; }
        .hero-content > *:nth-child(2) { animation-delay: 0.25s; }
        .hero-content > *:nth-child(3) { animation-delay: 0.4s; }
        .hero-content > *:nth-child(4) { animation-delay: 0.55s; }

        @keyframes pulse-ring {
          0%   { transform: scale(1);    opacity: .6; }
          100% { transform: scale(1.65); opacity: 0;  }
        }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .modal-box { animation: modalIn .3s cubic-bezier(.22,1,.36,1); }

        /* Cards */
        .card-adn { transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease !important; }
        .card-adn:hover { transform: translateY(-10px) !important; box-shadow: 0 24px 56px rgba(10,37,64,0.16) !important; }

        .card-partner:hover { border-color: rgba(247,181,0,0.5) !important; background: rgba(247,181,0,0.07) !important; }

        .expert-card { transition: all 0.35s cubic-bezier(.22,1,.36,1); }
        .expert-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(10,37,64,0.12); border-color: rgba(247,181,0,0.4) !important; }
        .expert-card:hover .expert-btn { background: #F7B500 !important; color: #0A2540 !important; }

        .stat-card { transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease; }
        .stat-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px rgba(10,37,64,0.12) !important; }

        /* Nav */
        .nav-link { color: #0A2540; text-decoration: none; font-size: 15px; font-weight: 500; transition: color .2s; }
        .nav-link:hover { color: #F7B500; }
        .nav-link-active { color: #F7B500 !important; font-weight: 700; }

        .drop-item { display: block; padding: 10px 16px; color: #0A2540; text-decoration: none; font-size: 14px; font-weight: 600; transition: background .15s; white-space: nowrap; }
        .drop-item:hover { background: #FFFBEB; }

        /* Buttons */
        .btn-gold {
          display: inline-flex; align-items: center; gap: 8px;
          background: #F7B500; color: #0A2540;
          border: none; border-radius: 10px;
          padding: 13px 28px; font-weight: 800; font-size: 15px;
          cursor: pointer; font-family: inherit;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          text-decoration: none;
        }
        .btn-gold:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(247,181,0,0.38); background: #e6a800; }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #F7B500;
          border: 2px solid #F7B500; border-radius: 10px;
          padding: 13px 28px; font-weight: 700; font-size: 15px;
          cursor: pointer; font-family: inherit;
          transition: transform 0.22s ease, background 0.22s ease;
          text-decoration: none;
        }
        .btn-outline:hover { transform: translateY(-3px); background: rgba(247,181,0,0.1); }

        .btn-conn {
          border: 2px solid #0A2540; color: #0A2540; background: transparent;
          padding: 9px 22px; border-radius: 9px; font-weight: 700; font-size: 14px;
          cursor: pointer; transition: all .22s; font-family: inherit;
        }
        .btn-conn:hover { background: #F7B500; border-color: #F7B500; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(247,181,0,0.30); }

        .btn-insc {
          background: #F7B500; color: #0A2540; border: 2px solid #F7B500;
          padding: 9px 22px; border-radius: 9px; font-weight: 800; font-size: 14px;
          cursor: pointer; transition: all .22s; font-family: inherit;
        }
        .btn-insc:hover { background: #e6a800; border-color: #e6a800; transform: translateY(-2px); box-shadow: 0 8px 22px rgba(247,181,0,0.40); }

        .btn-navy {
          background: #0A2540; color: white; border: none; border-radius: 9px;
          padding: 10px 24px; font-weight: 700; cursor: pointer; font-size: 14px;
          transition: all 0.22s ease; font-family: inherit; display: inline-flex; align-items: center; gap: 6px;
        }
        .btn-navy:hover { background: #F7B500; color: #0A2540; transform: translateY(-3px); box-shadow: 0 10px 28px rgba(247,181,0,0.3); }

        .btn-modal-primary {
          width: 100%; background: #F7B500; color: #0A2540; border: none; border-radius: 10px;
          padding: 13px 24px; font-weight: 800; font-size: 15px; cursor: pointer;
          transition: all .22s; font-family: inherit;
        }
        .btn-modal-primary:hover { background: #e6a800; transform: translateY(-2px); box-shadow: 0 8px 22px rgba(247,181,0,0.4); }

        .btn-modal-secondary {
          width: 100%; background: transparent; color: #0A2540; border: 2px solid rgba(10,37,64,0.18);
          border-radius: 10px; padding: 11px 24px; font-weight: 700; font-size: 15px; cursor: pointer;
          transition: all .22s; font-family: inherit;
        }
        .btn-modal-secondary:hover { border-color: #0A2540; transform: translateY(-2px); }

        .arrow-btn {
          width: 48px; height: 48px; border-radius: 50%; background: #0A2540; border: none;
          color: white; font-size: 17px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 18px rgba(10,37,64,0.22); transition: all 0.22s ease;
          position: absolute; top: 50%; transform: translateY(-50%); font-family: inherit;
        }
        .arrow-btn:hover { background: #F7B500; color: #0A2540; transform: translateY(-50%) scale(1.1); }

        .newsletter-input {
          flex: 1; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px; padding: 14px 20px; color: white; font-size: 15px;
          outline: none; transition: border-color 0.2s; font-family: inherit;
        }
        .newsletter-input:focus { border-color: rgba(247,181,0,0.6); }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.4); }

        /* Services grid hover */
        .service-card { transition: all 0.35s cubic-bezier(.22,1,.36,1); }
        .service-card:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(10,37,64,0.14) !important; }
        .service-card:hover .service-icon { transform: scale(1.1) rotate(-5deg); }
        .service-icon { transition: transform 0.3s ease; }
      `}</style>

      {/* ══════════════════════════════════════
          MODAL
      ══════════════════════════════════════ */}
      {showModal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-6"
          style={{ background: "rgba(10,37,64,0.65)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-box bg-white rounded-3xl text-center relative w-full max-w-[440px]"
            style={{ padding: "48px 44px", boxShadow: "0 32px 80px rgba(10,37,64,0.25)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-[30px] text-[#0A2540] mx-auto mb-6"
              style={{ background: "linear-gradient(135deg,#F7B500,#e6a800)", boxShadow: "0 10px 28px rgba(247,181,0,0.35)" }}
            >
              <FaLock />
            </div>
            <h2 className="text-2xl font-black text-[#0A2540] mb-3">Inscription requise</h2>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-8">
              Pour consulter le profil complet de cet expert, vous devez créer un compte ou vous connecter à votre espace Business Expert Hub.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/inscription" onClick={() => setShowModal(false)}>
                <button className="btn-modal-primary">Créer un compte gratuitement</button>
              </Link>
              <Link href="/connexion" onClick={() => setShowModal(false)}>
                <button className="btn-modal-secondary">{"J'ai déjà un compte — Connexion"}</button>
              </Link>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-[18px] bg-transparent border-none text-[22px] text-gray-400 cursor-pointer leading-none"
            >×</button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════
          HEADER
      ════════════════════════════════════════ */}
      <header className="bg-white sticky top-0 z-[100]" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <div className="max-w-[1280px] mx-auto px-6 h-[82px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
              <rect width="46" height="46" rx="12" fill="#0A2540"/>
              <rect x="23" y="7" width="13" height="13" rx="2" transform="rotate(45 23 7)" fill="#F7B500" opacity="0.15"/>
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#F7B500" fontSize="15" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.5">BEH</text>
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[18px] text-[#0A2540] tracking-[-0.4px]">
                Business <span className="text-[#F7B500]">Expert</span> Hub
              </span>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.8px] mt-[3px]">
                Plateforme Experts &amp; Startups
              </span>
            </div>
          </Link>

          <nav className="flex gap-7 items-center">
            <Link href="/"         className="nav-link nav-link-active">Accueil</Link>
            <Link href="/a-propos" className="nav-link">À propos</Link>
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link href="/services" className="nav-link font-semibold">Services ▾</Link>
              {servicesOpen && (
                <ul
                  className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-xl list-none p-[6px_0] m-0 z-[200] min-w-[200px]"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(10,37,64,0.06)" }}
                >
                  {navServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="drop-item">{s.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link href="/experts" className="nav-link">Experts</Link>
            <Link href="/blog"    className="nav-link">Blog</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>

          <div className="flex gap-3">
            <Link href="/connexion">
              <button className="btn-conn">Connexion</button>
            </Link>
            <Link href="/inscription">
              <button className="btn-insc">{"S'inscrire"}</button>
            </Link>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative bg-[#0A2540] text-white overflow-hidden" style={{ minHeight: 580 }}>
        {/* Diamonds */}
        {[
          { w: 460, r: 60,  delay: "0s"   },
          { w: 300, r: 150, delay: "1.2s" },
          { w: 170, r: 230, delay: "2.4s" },
        ].map((d, i) => (
          <div
            key={i}
            className="diamond-float absolute pointer-events-none"
            style={{
              width: d.w, height: d.w, right: d.r, top: "50%",
              transform: "translateY(-50%) rotate(45deg)",
              background: `rgba(255,255,255,${0.05 + i * 0.01})`,
              border: "1px solid rgba(255,255,255,0.09)",
              animationDelay: d.delay,
            }}
          />
        ))}
        <div className="absolute pointer-events-none"
          style={{ width: 220, height: 220, left: -70, bottom: -70, transform: "rotate(45deg)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
        {/* Glow */}
        <div className="absolute pointer-events-none"
          style={{ top: -100, left: "30%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(247,181,0,0.06) 0%,transparent 65%)" }} />

        <div className="hero-content relative z-10 max-w-[1280px] mx-auto px-8 py-28">
          <div
            className="inline-block mb-6 px-5 py-1.5 rounded-full text-[#0A2540] font-black text-[12px] tracking-[3px] uppercase"
            style={{ background: "#F7B500" }}
          >
            Cabinet de consulting &amp; conseil
          </div>
          <h1 className="font-black m-0 mb-6 leading-[1.08]" style={{ fontSize: "clamp(44px,6vw,78px)" }}>
            Propulsez votre{" "}
            <span className="text-[#F7B500]">startup</span>
            <br />
            vers l&apos;excellence
          </h1>
          <p className="text-[17px] text-white/80 max-w-[600px] leading-[1.85] mb-10">
            Plateforme d&apos;experts spécialisée dans l&apos;accompagnement stratégique des startups et entreprises en croissance. Nous proposons des services d&apos;expertise, de formations et de suivi personnalisé afin d&apos;optimiser la performance et soutenir votre développement durable.
          </p>
          <div className="flex flex-wrap gap-4 mb-14">
            <Link href="/services" className="btn-gold">Découvrir nos services <FaArrowRight size={13} /></Link>
            <Link href="/contact"  className="btn-outline">Contactez-nous <FaArrowRight size={13} /></Link>
          </div>
          {/* Trust bar */}
          <div className="flex items-center gap-8 flex-wrap">
            {[
              { val: "200+", label: "Startups" },
              { val: "50+",  label: "Experts" },
              { val: "94%",  label: "Satisfaction" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-10 bg-white/15" />}
                <div>
                  <div className="text-[26px] font-black text-[#F7B500] leading-none">{item.val}</div>
                  <div className="text-[12px] text-white/50 font-semibold uppercase tracking-wider mt-1">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  
      {/* ════════════════════════════════════════
          ADN — boutons liés vers /a-propos#section
      ════════════════════════════════════════ */}
      <section
        className="py-24 px-6 overflow-hidden relative"
        style={{ background: "linear-gradient(160deg,#f0f6ff 0%,#ffffff 60%,#fefaf0 100%)" }}
      >
        <div className="absolute pointer-events-none rounded-full"
          style={{ top: -80, right: -80, width: 400, height: 400, background: "radial-gradient(circle,rgba(247,181,0,0.09) 0%,transparent 70%)" }} />

        <FadeUp className="text-center mb-16">
          <span className="inline-block bg-[#F7B500] text-[#0A2540] font-black text-[12px] tracking-[3px] uppercase px-[18px] py-1.5 rounded-full mb-5">
            Qui sommes-nous
          </span>
          <h2 className="font-black text-[#0A2540] m-0 mb-3.5 leading-[1.15]" style={{ fontSize: "clamp(30px,4vw,50px)" }}>
            Notre <span className="text-[#F7B500]">ADN</span>
          </h2>
          <p className="text-gray-500 text-[17px] max-w-[480px] mx-auto">
            Les trois piliers qui guident chacune de nos actions au quotidien
          </p>
        </FadeUp>

        <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-8">
          {adnCards.map((card, i) => (
            <FadeUp key={i} delay={i * 0.18}>
              <div
                className="card-adn bg-white rounded-[22px] relative overflow-hidden flex flex-col"
                style={{ padding: "44px 36px", boxShadow: "0 6px 32px rgba(10,37,64,0.08)", border: "1px solid rgba(10,37,64,0.06)", height: "100%" }}
              >
                {/* Ghost number */}
                <div className="absolute top-4 right-6 text-[72px] font-black leading-none select-none text-[#0A2540]/[0.04]">
                  {card.num}
                </div>
                {/* Icon */}
                <div
                  className="w-[66px] h-[66px] rounded-[18px] flex items-center justify-center text-[28px] text-[#F7B500] mb-[26px]"
                  style={{ background: "linear-gradient(135deg,#0A2540,#1a4080)", boxShadow: "0 8px 22px rgba(10,37,64,0.22)" }}
                >
                  {card.icon}
                </div>
                <h3 className="text-[23px] font-black text-[#0A2540] mb-3.5">{card.title}</h3>
                <p className="text-gray-500 leading-[1.8] mb-[30px] text-[15px] flex-1">{card.desc}</p>

                {/* ✅ Bouton lié vers /a-propos#anchor */}
                <Link href={`/a-propos#${card.anchor}`} className="inline-block">
                  <button className="btn-navy">
                    Découvrir <FaArrowRight size={11} />
                  </button>
                </Link>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{ background: "linear-gradient(90deg,#F7B500,transparent)" }} />
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA link to full about page */}
        <FadeUp delay={0.4} className="text-center mt-12">
          <Link href="/a-propos" className="btn-gold">
            En savoir plus sur nous <FaArrowRight size={13} />
          </Link>
        </FadeUp>
      </section>

      {/* ════════════════════════════════════════
          EXPERTS
      ════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#f0f6ff 0%,#ffffff 100%)" }}>
        <div className="max-w-[1200px] mx-auto">
          <FadeUp className="text-center mb-16">
            <span className="inline-block bg-[#F7B500] text-[#0A2540] font-black text-[12px] tracking-[3px] uppercase px-[18px] py-1.5 rounded-full mb-5">
              Notre équipe
            </span>
            <h2 className="font-black text-[#0A2540] m-0 mb-3.5 leading-[1.15]" style={{ fontSize: "clamp(30px,4vw,50px)" }}>
              Nos <span className="text-[#F7B500]">Experts</span> certifiés
            </h2>
            <p className="text-gray-500 text-[17px] max-w-[480px] mx-auto">
              Des professionnels triés sur le volet pour vous accompagner
            </p>
          </FadeUp>

          <div className="grid grid-cols-4 gap-6">
            {experts.map((ex, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <div
                  className="expert-card bg-white rounded-[20px] overflow-hidden flex flex-col"
                  style={{ border: "1.5px solid rgba(10,37,64,0.08)", boxShadow: "0 4px 20px rgba(10,37,64,0.07)" }}
                >
                  <div className="h-[5px]" style={{ background: "linear-gradient(90deg,#F7B500,#e6a800)" }} />
                  <div className="pt-7 px-6 pb-5 text-center flex-1">
                    <div
                      className="w-[76px] h-[76px] rounded-full flex items-center justify-center text-2xl font-black text-[#F7B500] mx-auto mb-4"
                      style={{ background: "linear-gradient(135deg,#0A2540,#1a4080)", border: "3px solid rgba(247,181,0,0.3)" }}
                    >
                      {ex.initials}
                    </div>
                    <h3 className="text-[17px] font-black text-[#0A2540] mb-1.5 leading-snug">{ex.name}</h3>
                    <p className="text-[13px] text-gray-500 font-semibold mb-1">{ex.role}</p>
                    <p className="text-[12px] text-[#F7B500] font-bold mb-4">{ex.xp} d'expérience</p>
                    <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                      {ex.tags.slice(0, 2).map((t, j) => (
                        <span key={j} className="text-[11px] font-bold px-2.5 py-[3px] rounded-full text-[#0A2540]"
                          style={{ background: "rgba(10,37,64,0.07)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-1 text-[#F7B500] text-[13px]">
                      {"★".repeat(ex.rating)}
                      <span className="text-gray-400 text-[12px] ml-1">({ex.missions} missions)</span>
                    </div>
                  </div>
                  <div className="px-5 pb-[22px]">
                    <button
                      className="expert-btn w-full border-none rounded-[10px] py-[11px] px-4 font-bold text-[14px] cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 text-white"
                      style={{ background: "#0A2540", fontFamily: "inherit" }}
                      onClick={() => setShowModal(true)}
                    >
                      Voir le profil <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.45} className="text-center mt-[52px]">
            <Link href="/experts" className="btn-gold">Voir tous nos experts <FaArrowRight size={13} /></Link>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PARTENAIRES
      ════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-[#081B33] overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp className="text-center mb-14">
            <span
              className="inline-block text-[#F7B500] font-bold text-[12px] tracking-[3px] uppercase px-[18px] py-1.5 rounded-full mb-5"
              style={{ border: "1px solid rgba(247,181,0,0.3)" }}
            >
              Ils nous font confiance
            </span>
            <h2 className="font-black text-white m-0 leading-[1.15]" style={{ fontSize: "clamp(28px,3.5vw,44px)" }}>
              Nos <span className="text-[#F7B500]">Partenaires</span>
            </h2>
          </FadeUp>

          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-[100px] z-20 pointer-events-none"
              style={{ background: "linear-gradient(90deg,#081B33,transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-[100px] z-20 pointer-events-none"
              style={{ background: "linear-gradient(-90deg,#081B33,transparent)" }} />
            <div className="marquee-track">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="card-partner flex-shrink-0 min-w-[200px] rounded-[14px] p-[26px_28px] text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.3s ease" }}
                >
                  <div
                    className="w-[46px] h-[46px] rounded-[10px] flex items-center justify-center mx-auto mb-3 text-[#F7B500] font-black text-[14px]"
                    style={{ background: "linear-gradient(135deg,#0A2540,#1d4e89)", border: "1px solid rgba(247,181,0,0.2)" }}
                  >
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-white font-bold text-[14px]">{p.name}</div>
                  <div className="text-white/40 text-[12px] mt-1">{p.sector}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          TÉMOIGNAGES
      ════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#0A2540 0%,#0f3060 100%)" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(247,181,0,0.06) 0%,transparent 65%)" }} />

        <div className="max-w-[860px] mx-auto relative z-10">
          <FadeUp className="text-center mb-16">
            <span className="inline-block text-[#F7B500] font-bold text-[12px] tracking-[3px] uppercase px-[18px] py-1.5 rounded-full mb-5"
              style={{ border: "1px solid rgba(247,181,0,0.35)" }}>
              Ils témoignent
            </span>
            <h2 className="font-black text-white m-0 mb-3.5 leading-[1.15]" style={{ fontSize: "clamp(30px,4vw,50px)" }}>
              Ce que disent nos <span className="text-[#F7B500]">clients</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.15} className="relative">
            <div
              className="bg-white rounded-3xl relative"
              style={{
                padding: "56px 64px",
                boxShadow: "0 8px 50px rgba(0,0,0,0.25)",
                opacity: animating ? 0 : 1,
                transform: animating ? "scale(0.97)" : "scale(1)",
                transition: "opacity 0.28s ease, transform 0.28s ease",
              }}
            >
              <FaQuoteLeft className="absolute top-8 left-12 text-[36px]" style={{ color: "rgba(247,181,0,0.22)" }} />
              <div className="flex gap-1.5 justify-center mb-[26px]">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <FaStar key={i} className="text-[#F7B500] text-[18px]" />
                ))}
              </div>
              <p className="text-gray-700 leading-[1.8] text-center italic mb-9" style={{ fontSize: "clamp(16px,2vw,21px)" }}>
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <div className="text-center">
                <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-[#F7B500] font-black text-[16px] mx-auto mb-3"
                  style={{ background: "linear-gradient(135deg,#0A2540,#1a4080)" }}>
                  {testimonials[active].author.split(" ").map((w) => w[0]).join("")}
                </div>
                <div className="font-black text-[#0A2540] text-[16px]">{testimonials[active].author}</div>
                <div className="text-[#F7B500] text-[14px] font-semibold mt-0.5">{testimonials[active].role}</div>
              </div>
            </div>

            <button className="arrow-btn" style={{ left: -24 }}
              onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)}>
              <FaChevronLeft />
            </button>
            <button className="arrow-btn" style={{ right: -24 }}
              onClick={() => goTo((active + 1) % testimonials.length)}>
              <FaChevronRight />
            </button>
          </FadeUp>

          <div className="flex justify-center gap-2.5 mt-9">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className="h-[10px] rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                style={{ width: i === active ? 30 : 10, background: i === active ? "#F7B500" : "rgba(255,255,255,0.25)" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          NEWSLETTER
      ════════════════════════════════════════ */}
      <section className="py-[90px] px-6 bg-white relative overflow-hidden">
        <div className="absolute pointer-events-none rounded-full"
          style={{ top: -120, right: -120, width: 500, height: 500, background: "radial-gradient(circle,rgba(247,181,0,0.07) 0%,transparent 70%)" }} />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="rounded-[28px] overflow-hidden relative"
            style={{ background: "linear-gradient(135deg,#0A2540,#1a4080)", padding: "72px 64px", boxShadow: "0 20px 60px rgba(10,37,64,0.18)" }}>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle,rgba(247,181,0,0.08) 0%,transparent 65%)" }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

            <div className="max-w-[560px] mx-auto relative z-10">
              <FadeUp className="text-center">
                <div className="w-16 h-16 rounded-[18px] flex items-center justify-center mx-auto mb-7 text-[26px] text-[#0A2540]"
                  style={{ background: "linear-gradient(135deg,#F7B500,#e6a800)", boxShadow: "0 10px 28px rgba(247,181,0,0.3)" }}>
                  <FaEnvelope />
                </div>
                <span className="inline-block text-[#F7B500] font-bold text-[12px] tracking-[3px] uppercase px-[18px] py-1.5 rounded-full mb-[22px]"
                  style={{ border: "1px solid rgba(247,181,0,0.35)" }}>
                  Newsletter
                </span>
                <h2 className="font-black text-white m-0 mb-3.5 leading-[1.15]" style={{ fontSize: "clamp(28px,4vw,46px)" }}>
                  Restez <span className="text-[#F7B500]">informé</span>
                </h2>
                <p className="text-white/50 text-[16px] mb-10 leading-[1.7]">
                  Recevez nos dernières actualités, conseils et ressources pour accélérer la croissance de votre startup.
                </p>

                {submitted ? (
                  <div className="rounded-2xl py-7 px-8 text-[#4ade80] text-[18px] font-bold"
                    style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.35)" }}>
                    ✅ Merci ! Vous êtes bien inscrit à notre newsletter.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletter} className="flex gap-3 max-w-[500px] mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse email..."
                      required
                      className="newsletter-input"
                    />
                    <button type="submit" className="btn-gold flex-shrink-0">{"S'inscrire"}</button>
                  </form>
                )}
                <p className="text-white/[0.28] text-[12px] mt-4">Pas de spam. Désabonnement en un clic. 🔒</p>

                {/* Mini trust indicators */}
                <div className="flex items-center justify-center gap-6 mt-8">
                  {["2 500+ abonnés", "1 email / semaine", "100% gratuit"].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-white/40 text-[13px]">
                      <FaCheck className="text-[#F7B500] text-[10px]" />
                      {item}
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="bg-[#081B33] text-white pt-16 pb-8 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div className="col-span-1">
              <Link href="/" className="flex items-center gap-3 no-underline mb-5">
                <svg width="40" height="40" viewBox="0 0 46 46" fill="none">
                  <rect width="46" height="46" rx="12" fill="#0A2540"/>
                  <rect x="23" y="7" width="13" height="13" rx="2" transform="rotate(45 23 7)" fill="#F7B500" opacity="0.15"/>
                  <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#F7B500" fontSize="15" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.5">BEH</text>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="font-black text-[15px] text-white tracking-[-0.3px]">
                    Business <span className="text-[#F7B500]">Expert</span> Hub
                  </span>
                </div>
              </Link>
              <p className="text-white/40 text-[13px] leading-[1.75]">
                Plateforme de mise en relation entre startups ambitieuses et experts certifiés.
              </p>
            </div>
            {/* Navigation */}
            <div>
              <h4 className="text-white font-black text-[14px] uppercase tracking-wider mb-5">Navigation</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {[["Accueil", "/"], ["À propos", "/a-propos"], ["Services", "/services"], ["Experts", "/experts"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-white/45 text-[14px] no-underline hover:text-[#F7B500] transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Services */}
            <div>
              <h4 className="text-white font-black text-[14px] uppercase tracking-wider mb-5">Services</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {navServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-white/45 text-[14px] no-underline hover:text-[#F7B500] transition-colors">{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 className="text-white font-black text-[14px] uppercase tracking-wider mb-5">Contact</h4>
              <div className="flex flex-col gap-3 text-white/45 text-[14px]">
                <span>📧 </span>
                <span>📞 </span>
                <span>📍 </span>
              </div>
              <div className="flex gap-3 mt-6">
                {["in", "tw", "fb"].map((soc) => (
                  <div key={soc}
                    className="w-9 h-9 rounded-[8px] flex items-center justify-center text-[#F7B500] font-black text-[12px] cursor-pointer transition-all hover:scale-110"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    {soc.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.07] pt-8 flex items-center justify-between">
            <p className="m-0 text-white/30 text-[13px]">© 2026 Business Expert Hub — Tous droits réservés</p>
            <div className="flex gap-6">
              {["Mentions légales", "Politique de confidentialité", "CGU"].map((item) => (
                <Link key={item} href="#" className="text-white/30 text-[12px] no-underline hover:text-[#F7B500] transition-colors">{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}