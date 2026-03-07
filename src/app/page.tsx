"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaBullseye, FaRocket, FaHandsHelping } from "react-icons/fa";

export default function Home() {
  const [servicesOpen, setServicesOpen] = useState(false);

  // Hero images (change chaque 3 secondes)
  const heroImages = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const adnCards = [
    { title: "Vision", desc: "Notre vision pour propulser les startups vers l’excellence.", icon: <FaBullseye className="text-[#F7B500] text-5xl mb-4 mx-auto" /> },
    { title: "Mission", desc: "Notre mission pour booster les startups et leurs experts.", icon: <FaRocket className="text-[#F7B500] text-5xl mb-4 mx-auto" /> },
    { title: "Valeurs", desc: "Nos valeurs clés pour un accompagnement de qualité.", icon: <FaHandsHelping className="text-[#F7B500] text-5xl mb-4 mx-auto" /> },
  ];

  const experts = [
    { name: "Expert Marketing", role: "Spécialiste croissance startup" },
    { name: "Expert Finance", role: "Conseil en levée de fonds" },
    { name: "Expert Tech", role: "Développement produit" },
  ];

  const testimonials = [
    { text: "Grâce à StartUp Connect, notre startup a doublé son chiffre d'affaires en 6 mois!", author: "Startup ABC" },
    { text: "Les experts m'ont accompagné efficacement dans ma levée de fonds.", author: "Startup XYZ" },
  ];

  return (
    <div className="font-sans text-gray-700">

      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

          {/* Menu */}
          <ul className="flex gap-6 items-center text-[#0A2540]">
            <li className="hover:text-[#F7B500] cursor-pointer transition-colors">Accueil</li>
            <li className="hover:text-[#F7B500] cursor-pointer transition-colors">A propos</li>
            <li className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <span className="cursor-pointer hover:text-[#F7B500] transition-colors">Services</span>
              {servicesOpen && (
                <ul className="absolute top-8 left-0 bg-white shadow-lg rounded-lg w-52 text-[#0A2540]">
                  <li className="p-3 hover:bg-[#F9F2E7] cursor-pointer transition-colors">Consulting</li>
                  <li className="p-3 hover:bg-[#F9F2E7] cursor-pointer transition-colors">Audit sur site</li>
                  <li className="p-3 hover:bg-[#F9F2E7] cursor-pointer transition-colors">Accompagnement</li>
                  <li className="p-3 hover:bg-[#F9F2E7] cursor-pointer transition-colors">Formations</li>
                </ul>
              )}
            </li>
            <li className="hover:text-[#F7B500] cursor-pointer transition-colors">Experts</li>
            <li className="hover:text-[#F7B500] cursor-pointer transition-colors">Formations</li>
            <li className="hover:text-[#F7B500] cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-[#F7B500] cursor-pointer transition-colors">Contact</li>
          </ul>

          {/* Réseaux sociaux + Connexion / Inscription */}
          <div className="flex items-center gap-4">
            <div className="flex gap-3 text-[#0A2540] text-lg">
              <a href="#" className="hover:text-[#F7B500] transition-colors"><FaFacebookF /></a>
              <a href="#" className="hover:text-[#F7B500] transition-colors"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-[#F7B500] transition-colors"><FaInstagram /></a>
            </div>
            <Link href="/connexion">
              <button className="border border-[#0A2540] text-[#0A2540] px-4 py-2 rounded-lg hover:bg-[#F7B500] hover:text-[#0A2540] transition-colors duration-300">
                Connexion
              </button>
            </Link>
            <Link href="/inscription">
              <button className="bg-[#F7B500] text-[#0A2540] px-4 py-2 rounded-lg hover:bg-[#E0A700] hover:text-[#0A2540] transition-colors duration-300">
                S'inscrire
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative bg-[hsl(210,22%,43%)] text-white py-28 text-center overflow-hidden">
        {/* Cercles animés */}
        <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-yellow-500 opacity-20 rounded-full animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-yellow-500 opacity-15 rounded-full animate-pulse-slow blur-3xl"></div>
        <div className="absolute top-[30%] left-[70%] w-56 h-56 bg-yellow-400 opacity-10 rounded-full animate-pulse-slow blur-2xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="text-[hsl(0,0%,100%)]">Cabinet de consulting</span>{" "}
            <span className="text-[#F7B500]">& conseil</span>
          </h1>
          <p className="text-2xl mb-8">Faites passer votre startup au niveau supérieur grâce à notre expertise dédiée.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-[#F7B500] text-[#0A2540] px-6 py-3 rounded-lg font-semibold 
                               hover:bg-[#E0A700] hover:scale-105 transform transition-all duration-500 animate-bounce-slow">
              Découvrir nos services →
            </button>
          </div>
        </div>
      </section>

      {/* ================= Notre ADN ================= */}
      <section className="py-24 bg-gradient-to-r from-[#E6F0FA] to-[#ffffff]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#0A2540]">Notre ADN</h2>
        <p className="text-center text-lg text-gray-600 mb-12">Ce qui nous guide au quotidien</p>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center px-4">
          {adnCards.map((card, idx) => (
            <div key={idx} className="relative bg-white p-8 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 opacity-0 animate-fadeInUp" style={{ animationDelay: `${idx * 0.3}s` }}>
              {card.icon}
              <div className="w-16 h-1 bg-[#F7B500] mx-auto rounded-full mb-4"></div>
              <h3 className="text-2xl font-semibold mb-4 text-[#0A2540]">{card.title}</h3>
              <p className="text-gray-600 mb-6">{card.desc}</p>
              <button className="mt-2 bg-[#0A2540] text-white px-5 py-2 rounded-lg hover:bg-[#F7B500] hover:text-[#0A2540] transition-colors duration-300">
                Découvrir
              </button>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.7s ease forwards; }
        `}</style>
      </section>

      {/* ================= Experts ================= */}
      <section className="py-20 bg-[#F9FAFB]">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0A2540]">Nos Experts</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {experts.map((exp, idx) => (
            <div key={idx} className="bg-white p-6 shadow rounded-lg text-center hover:scale-105 transition-transform">
              <h3 className="font-semibold text-lg text-[#0A2540]">{exp.name}</h3>
              <p className="text-gray-600">{exp.role}</p>
              <button className="mt-4 bg-[#F7B500] text-[#0A2540] px-4 py-2 rounded-lg hover:bg-[#E0A700] transition-colors duration-300">
                Découvrir
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Témoignages ================= */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0A2540]">Témoignages</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 text-center px-4">
          {testimonials.map((t, idx) => (
            <div key={idx} className="shadow-lg p-6 rounded-lg">
              <p>"{t.text}"</p>
              <p className="mt-2 font-semibold text-[#0A2540]">- {t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Partenaires ================= */}
      <section className="py-20 bg-[#F9FAFB]">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#0A2540]">Partenaires</h2>
        <div className="max-w-7xl mx-auto flex justify-center flex-wrap gap-8 items-center">
          {[1,2,3,4].map((i) => (
            <img key={i} src={`https://via.placeholder.com/150x50?text=Partner+${i}`} alt={`Partenaire ${i}`} className="h-12"/>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#081B33] text-white py-10 text-center">
        <p className="mb-3">© 2026 StartUp Connect</p>
        <p className="text-gray-300">Cabinet de consulting et conseil pour startups</p>
      </footer>

    </div>
  );
}