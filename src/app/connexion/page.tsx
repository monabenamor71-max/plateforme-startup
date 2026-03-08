"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";

export default function Connexion() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Tous les champs sont obligatoires."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    if (email === "test@startup.com" && password === "123456") {
      setSuccess(true);
    } else {
      setError("Email ou mot de passe incorrect.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A2540] flex flex-col relative overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; }

        @keyframes floatY {
          0%, 100% { transform: rotate(45deg) translateY(0px); }
          50%       { transform: rotate(45deg) translateY(-18px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .diamond  { animation: floatY 6s ease-in-out infinite; }
        .card-in  { animation: fadeSlideUp 0.65s cubic-bezier(.22,1,.36,1) both; }

        .input-field {
          width: 100%;
          background: rgba(10,37,64,0.06);
          border: 1.5px solid rgba(10,37,64,0.12);
          border-radius: 12px;
          padding: 14px 16px 14px 46px;
          font-size: 15px;
          color: #0A2540;
          outline: none;
          transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .input-field::placeholder { color: #9CA3AF; }
        .input-field:focus {
          border-color: #F7B500;
          box-shadow: 0 0 0 4px rgba(247,181,0,0.12);
          background: white;
        }
        .input-field.error-field {
          border-color: #EF4444;
          box-shadow: 0 0 0 4px rgba(239,68,68,0.10);
        }

        .spinner {
          width: 20px; height: 20px;
          border: 2.5px solid rgba(10,37,64,0.25);
          border-top-color: #0A2540;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
        }

        .link-gold { color: #F7B500; text-decoration: none; font-weight: 600; transition: opacity 0.2s; }
        .link-gold:hover { opacity: 0.75; text-decoration: underline; }
      `}</style>

      {/* ══════════ LOSANGES DÉCO ══════════ */}
      {[
        { w: 380, right: "-80px", top: "10%",  op: 0.05, delay: "0s"   },
        { w: 240, right: "60px",  top: "18%",  op: 0.06, delay: "1.5s" },
        { w: 140, right: "110px", top: "26%",  op: 0.07, delay: "0.7s" },
        { w: 300, left:  "-100px",bottom: "5%",op: 0.04, delay: "2s"   },
      ].map((d, i) => (
        <div
          key={i}
          className="diamond absolute pointer-events-none"
          style={{
            width: d.w, height: d.w,
            right:  "right"  in d ? d.right  : undefined,
            left:   "left"   in d ? d.left   : undefined,
            top:    "top"    in d ? d.top    : undefined,
            bottom: "bottom" in d ? d.bottom : undefined,
            transform: "rotate(45deg)",
            background: `rgba(255,255,255,${d.op})`,
            border: "1px solid rgba(255,255,255,0.08)",
            animationDelay: d.delay,
          }}
        />
      ))}

      {/* Lueur centrale */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(247,181,0,0.07) 0%,transparent 65%)" }}
      />

      {/* ══════════ HEADER MINI ══════════ */}
      <header className="flex items-center justify-between px-10 py-5 relative z-10">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-[42px] h-[42px] bg-[#F7B500] rounded-[10px] flex items-center justify-center text-[#0A2540] font-black text-[11px] flex-shrink-0">
            BEH
          </div>
          <div>
            <div className="font-extrabold text-[17px] text-white leading-none">Business Expert Hub</div>
            <div className="text-[11px] text-white/45">Experts & Startups</div>
          </div>
        </Link>
        <Link
          href="/inscription"
          className="text-white/70 no-underline text-[14px] font-medium transition-colors duration-200 hover:text-[#F7B500]"
        >
          Pas de compte ?{" "}
          <span className="text-[#F7B500] font-bold">{"S'inscrire →"}</span>
        </Link>
      </header>

      {/* ══════════ CONTENU PRINCIPAL ══════════ */}
      <main className="flex-1 flex items-center justify-center px-6 py-10 relative z-10">
        <div className="w-full max-w-[460px]">

          {/* ── CARTE ── */}
          <div
            className="card-in bg-white rounded-3xl"
            style={{ padding: "48px 44px", boxShadow: "0 32px 80px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.06)" }}
          >
            {success ? (
              /* ── SUCCÈS ── */
              <div className="text-center py-4">
                <div
                  className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-6 text-[30px] text-white"
                  style={{ background: "linear-gradient(135deg,#22C55E,#16a34a)", boxShadow: "0 10px 28px rgba(34,197,94,0.35)" }}
                >
                  ✓
                </div>
                <h2 className="text-2xl font-black text-[#0A2540] mb-2.5">Connexion réussie !</h2>
                <p className="text-gray-500 text-[15px] mb-8 leading-relaxed">
                  Bienvenue sur Business Expert Hub. Vous allez être redirigé vers votre tableau de bord.
                </p>
                <Link href="/dashboard">
                  <button
                    className="bg-[#F7B500] text-[#0A2540] border-none rounded-xl px-8 py-3.5 font-black text-[15px] cursor-pointer"
                    style={{ fontFamily: "inherit" }}
                  >
                    Accéder au dashboard →
                  </button>
                </Link>
              </div>
            ) : (
              <>
                {/* En-tête de la carte */}
                <div className="text-center mb-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-[22px] text-[#0A2540]"
                    style={{ background: "linear-gradient(135deg,#F7B500,#e6a800)", boxShadow: "0 8px 22px rgba(247,181,0,0.30)" }}
                  >
                    <FaLock />
                  </div>
                  <h1 className="text-[26px] font-black text-[#0A2540] mb-2 leading-tight">
                    Bienvenue
                  </h1>
                  <p className="text-gray-500 text-[15px]">
                    Connectez-vous à votre espace Business Expert Hub
                  </p>
                </div>

                {/* ── ERREUR ── */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-[10px] px-4 py-3 mb-6 flex items-center gap-2.5 text-red-600 text-[14px] font-semibold">
                    <span className="text-[16px]">⚠️</span> {error}
                  </div>
                )}

                {/* ── FORMULAIRE ── */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">

                  {/* Email */}
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2 tracking-[0.3px]">
                      Adresse email
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[15px] pointer-events-none" />
                      <input
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setError(""); }}
                        className={`input-field${error ? " error-field" : ""}`}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[13px] font-bold text-gray-700 tracking-[0.3px]">
                        Mot de passe
                      </label>
                      <Link href="/mot-de-passe-oublie" className="link-gold text-[12px]">
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <div className="relative">
                      <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[14px] pointer-events-none" />
                      <input
                        type={showPwd ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={e => { setPassword(e.target.value); setError(""); }}
                        className={`input-field${error ? " error-field" : ""}`}
                        style={{ paddingRight: 46 }}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd(p => !p)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer p-1 transition-colors duration-200 hover:text-[#0A2540]"
                      >
                        {showPwd ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Bouton submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#F7B500] text-[#0A2540] border-none rounded-xl py-[15px] text-[16px] font-black cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed hover:enabled:bg-[#e6a800] hover:enabled:-translate-y-0.5"
                    style={{ fontFamily: "inherit", boxShadow: "none" }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.boxShadow = "0 10px 28px rgba(247,181,0,0.40)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {loading ? <div className="spinner" /> : <>Se connecter <FaArrowRight size={14} /></>}
                  </button>
                </form>

                {/* ── SÉPARATEUR ── */}
                <div className="flex items-center gap-4 my-7">
                  <div className="flex-1 h-px bg-[#0A2540]/[0.08]" />
                  <span className="text-gray-400 text-[13px] font-medium">ou continuer avec</span>
                  <div className="flex-1 h-px bg-[#0A2540]/[0.08]" />
                </div>

                {/* ── PIED ── */}
                <p className="text-center mt-7 text-[14px] text-gray-500">
                  Pas encore de compte ?{" "}
                  <Link href="/inscription" className="link-gold">Créer un compte gratuit</Link>
                </p>
              </>
            )}
          </div>

          {/* Texte sous la carte */}
          <p className="text-center mt-6 text-[12px] text-white/30 leading-relaxed">
            En vous connectant, vous acceptez nos{" "}
            <a href="#" className="text-[#F7B500]/60 no-underline hover:underline">Conditions d'utilisation</a>
            {" "}et notre{" "}
            <a href="#" className="text-[#F7B500]/60 no-underline hover:underline">Politique de confidentialité</a>
          </p>
        </div>
      </main>
    </div>
  );
}