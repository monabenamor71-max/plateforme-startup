"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import {
  FaUser, FaEnvelope, FaLock, FaPhone, FaBriefcase,
  FaEye, FaEyeSlash, FaArrowRight, FaCheckCircle,
  FaUpload, FaTimesCircle, FaRocket,
} from "react-icons/fa";

/* ══════════════════════════════════════
   TYPES
══════════════════════════════════════ */
type Role = "Startup" | "Expert";

interface FormData {
  nom: string; prenom: string; tel: string; email: string;
  password: string; confirmPassword: string;
  role: Role; domaine: string; cv: File | null;
}

/* ══════════════════════════════════════
   HELPER — force du mot de passe
══════════════════════════════════════ */
function pwdStrength(pwd: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pwd.length >= 8)           score++;
  if (/[A-Z]/.test(pwd))         score++;
  if (/[0-9]/.test(pwd))         score++;
  if (/[^A-Za-z0-9]/.test(pwd))  score++;
  const map = [
    { label: "",          color: "transparent" },
    { label: "Faible",    color: "#EF4444"     },
    { label: "Moyen",     color: "#F59E0B"     },
    { label: "Bon",       color: "#3B82F6"     },
    { label: "Excellent", color: "#22C55E"     },
  ];
  return { score, ...map[score] };
}

/* ══════════════════════════════════════
   COMPOSANT FIELD
══════════════════════════════════════ */
function Field({
  label, icon, error, children,
}: { label: string; icon?: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-bold text-gray-700 tracking-[0.3px]">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[14px] pointer-events-none z-10">
            {icon}
          </span>
        )}
        {children}
      </div>
      {error && (
        <span className="text-[12px] text-red-500 flex items-center gap-1.5 font-semibold">
          <FaTimesCircle size={11} /> {error}
        </span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   PAGE PRINCIPALE
══════════════════════════════════════ */
export default function Inscription() {
  const [formData, setFormData] = useState<FormData>({
    nom: "", prenom: "", tel: "", email: "",
    password: "", confirmPassword: "",
    role: "Startup", domaine: "", cv: null,
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [showPwd, setShowPwd]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [success, setSuccess]         = useState(false);
  const [step, setStep]               = useState<1 | 2>(1);
  const fileRef = useRef<HTMLInputElement>(null);

  const pwd = pwdStrength(formData.password);

  function update(field: keyof FormData, value: string | File | null) {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));
  }

  function validateStep1(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.nom.trim())    errs.nom    = "Le nom est obligatoire.";
    if (!formData.prenom.trim()) errs.prenom = "Le prénom est obligatoire.";
    if (!formData.tel.match(/^[+]?[\d\s\-]{8,15}$/)) errs.tel = "Numéro invalide (ex: +216 XX XXX XXX).";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Adresse email invalide.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2(): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (pwd.score < 2) errs.password = "Mot de passe trop faible (min. 8 car., 1 maj., 1 chiffre).";
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = "Les mots de passe ne correspondent pas.";
    if (formData.role === "Expert") {
      if (!formData.domaine.trim()) errs.domaine = "Le domaine est obligatoire pour les experts.";
      if (!formData.cv)             errs.cv      = "Le CV (PDF) est obligatoire pour les experts.";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    if (formData.email === "existe@startup.com") {
      setFieldErrors({ email: "Cet email est déjà utilisé." });
      setStep(1);
      setLoading(false);
      return;
    }
    setLoading(false);
    setSuccess(true);
  }

  const inputClass = (field: keyof FormData) =>
    `insc-input${fieldErrors[field] ? " insc-input-err" : ""}`;

  return (
    <div className="min-h-screen bg-[#0A2540] flex flex-col relative overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes floatY {
          0%,100% { transform: rotate(45deg) translateY(0px); }
          50%      { transform: rotate(45deg) translateY(-18px); }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(36px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes progressIn { from { width:0; } }

        .diamond  { animation: floatY 6s ease-in-out infinite; position:absolute; pointer-events:none; }
        .card-in  { animation: fadeSlideUp 0.7s cubic-bezier(.22,1,.36,1) both; }

        .insc-input {
          width:100%; background:rgba(10,37,64,0.05);
          border:1.5px solid rgba(10,37,64,0.12); border-radius:11px;
          padding:13px 16px 13px 44px;
          font-size:14.5px; color:#0A2540; outline:none;
          transition:border-color .22s, box-shadow .22s, background .22s;
          font-family:'Plus Jakarta Sans',sans-serif;
        }
        .insc-input::placeholder { color:#9CA3AF; }
        .insc-input:focus { border-color:#F7B500; box-shadow:0 0 0 4px rgba(247,181,0,0.12); background:white; }
        .insc-input-err { border-color:#EF4444 !important; box-shadow:0 0 0 3px rgba(239,68,68,0.10) !important; }

        .spinner {
          width:20px; height:20px;
          border:2.5px solid rgba(10,37,64,0.25);
          border-top-color:#0A2540;
          border-radius:50%;
          animation:spin .75s linear infinite;
        }

        .pwd-bar {
          height:5px; border-radius:99px;
          transition:width .4s ease, background .4s ease;
          animation:progressIn .4s ease;
        }

        .role-card {
          flex:1; border:2px solid rgba(10,37,64,0.10); border-radius:14px;
          padding:18px 14px; text-align:center; cursor:pointer;
          transition:all .25s; background:rgba(10,37,64,0.03);
        }
        .role-card.active { border-color:#F7B500; background:#FFFBEB; box-shadow:0 4px 18px rgba(247,181,0,0.18); }
        .role-card:hover:not(.active) { border-color:rgba(10,37,64,0.22); background:rgba(10,37,64,0.06); }

        .upload-zone {
          border:2px dashed rgba(10,37,64,0.18); border-radius:12px;
          padding:22px; text-align:center; cursor:pointer;
          transition:all .25s; background:rgba(10,37,64,0.03);
        }
        .upload-zone:hover, .upload-zone.has-file { border-color:#F7B500; background:#FFFBEB; }
      `}</style>

      {/* ══ LOSANGES FOND ══ */}
      {[
        { w: 380, right: "-80px",  top: "8%",     op: .05, delay: "0s"   },
        { w: 240, right: "60px",   top: "16%",    op: .06, delay: "1.5s" },
        { w: 140, right: "110px",  top: "26%",    op: .07, delay: ".8s"  },
        { w: 280, left:  "-100px", bottom: "8%",  op: .04, delay: "2s"   },
        { w: 160, left:  "80px",   bottom: "18%", op: .05, delay: ".4s"  },
      ].map((d, i) => (
        <div
          key={i}
          className="diamond"
          style={{
            width: d.w, height: d.w,
            right:  "right"  in d ? (d as any).right  : undefined,
            left:   "left"   in d ? (d as any).left   : undefined,
            top:    "top"    in d ? (d as any).top    : undefined,
            bottom: "bottom" in d ? (d as any).bottom : undefined,
            transform: "rotate(45deg)",
            background: `rgba(255,255,255,${d.op})`,
            border: "1px solid rgba(255,255,255,0.08)",
            animationDelay: d.delay,
          }}
        />
      ))}

      {/* Lueur centrale */}
      <div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(247,181,0,0.06) 0%,transparent 65%)" }}
      />

      {/* ══ HEADER ══ */}
      <header className="flex items-center justify-between px-10 py-5 relative z-10 flex-shrink-0">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-[42px] h-[42px] bg-[#F7B500] rounded-[10px] flex items-center justify-center text-[#0A2540] font-black text-[18px]">
            BEH
          </div>
          <div>
            <div className="font-extrabold text-[17px] text-white leading-none">Business Expert Hub</div>
            <div className="text-[11px] text-white/45">Experts & Startups</div>
          </div>
        </Link>
        <Link
          href="/connexion"
          className="text-white/70 no-underline text-[14px] font-medium transition-colors duration-200 hover:text-[#F7B500]"
        >
          Déjà un compte ?{" "}
          <span className="text-[#F7B500] font-bold">Se connecter →</span>
        </Link>
      </header>

      {/* ══ MAIN ══ */}
      <main className="flex-1 flex items-center justify-center px-6 pt-6 pb-12 relative z-10">
        <div className="w-full max-w-[520px]">

          {/* ══ SUCCÈS ══ */}
          {success ? (
            <div
              className="card-in bg-white rounded-3xl text-center"
              style={{ padding: "56px 44px", boxShadow: "0 32px 80px rgba(0,0,0,0.28)" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-7 text-[34px] text-white"
                style={{ background: "linear-gradient(135deg,#22C55E,#16a34a)", boxShadow: "0 12px 32px rgba(34,197,94,0.38)" }}
              >✓</div>
              <h2 className="text-[26px] font-black text-[#0A2540] mb-3">Compte créé avec succès !</h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-2">
                Bienvenue sur Business Expert Hub,{" "}
                <strong className="text-[#0A2540]">{formData.prenom} {formData.nom}</strong> !
              </p>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-9">
                {formData.role === "Expert"
                  ? "Votre dossier expert est en cours de validation. Vous recevrez un email sous 48h."
                  : "Votre espace startup est prêt. Commencez dès maintenant à trouver vos experts."}
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/connexion">
                  <button
                    className="w-full bg-[#F7B500] text-[#0A2540] border-none rounded-xl py-3.5 text-[16px] font-black cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200 hover:bg-[#e6a800] hover:-translate-y-0.5"
                    style={{ fontFamily: "inherit" }}
                  >
                    Se connecter maintenant <FaArrowRight size={14} />
                  </button>
                </Link>
                <Link href="/">
                  <button
                    className="w-full bg-transparent text-[#0A2540] border border-[#0A2540]/15 rounded-xl py-3 text-[15px] font-bold cursor-pointer transition-all duration-200 hover:border-[#0A2540] hover:bg-[#0A2540]/[0.04]"
                    style={{ fontFamily: "inherit" }}
                  >
                    Retour à l&apos;accueil
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div
              className="card-in bg-white rounded-3xl"
              style={{ padding: "44px 44px 48px", boxShadow: "0 32px 80px rgba(0,0,0,0.28)" }}
            >
              {/* ── EN-TÊTE ── */}
              <div className="text-center mb-7">
                <div
                  className="w-[58px] h-[58px] rounded-2xl flex items-center justify-center mx-auto mb-[18px] text-[22px] text-[#F7B500]"
                  style={{ background: "linear-gradient(135deg,#0A2540,#1a4080)", boxShadow: "0 8px 24px rgba(10,37,64,0.25)" }}
                >
                  <FaUser />
                </div>
                <h1 className="text-[24px] font-black text-[#0A2540] mb-1.5">Créer votre compte</h1>
              </div>

              {/* ── STEPPER ── */}
              <div className="flex items-center mb-8">
                {[1, 2].map((s, i) => (
                  <div key={s} className={`flex items-center ${i === 0 ? "flex-1" : ""}`}>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center font-black text-[13px] transition-all duration-300"
                        style={{
                          background: step >= s ? "#0A2540" : "rgba(10,37,64,0.08)",
                          color: step >= s ? "#F7B500" : "#9CA3AF",
                          border: step === s ? "2px solid #F7B500" : "2px solid transparent",
                          boxShadow: step === s ? "0 0 0 3px rgba(247,181,0,0.18)" : "none",
                        }}
                      >
                        {step > s ? <FaCheckCircle size={14} /> : s}
                      </div>
                      <span
                        className="text-[11px] font-bold whitespace-nowrap"
                        style={{ color: step >= s ? "#0A2540" : "#9CA3AF" }}
                      >
                        {s === 1 ? "Informations" : "Sécurité & Rôle"}
                      </span>
                    </div>
                    {i === 0 && (
                      <div
                        className="flex-1 h-0.5 mx-2.5 mb-4 rounded-full transition-all duration-300"
                        style={{ background: step > 1 ? "#F7B500" : "rgba(10,37,64,0.10)" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* ════════════════
                  ÉTAPE 1
              ════════════════ */}
              {step === 1 && (
                <form
                  onSubmit={e => { e.preventDefault(); if (validateStep1()) setStep(2); }}
                  className="flex flex-col gap-4"
                >
                  {/* Nom / Prénom */}
                  <div className="flex gap-3">
                    <Field label="Nom" icon={<FaUser />} error={fieldErrors.nom}>
                      <input
                        type="text" placeholder="Votre nom"
                        value={formData.nom} onChange={e => update("nom", e.target.value)}
                        className={inputClass("nom")} autoComplete="family-name"
                      />
                    </Field>
                    <Field label="Prénom" icon={<FaUser />} error={fieldErrors.prenom}>
                      <input
                        type="text" placeholder="Votre prénom"
                        value={formData.prenom} onChange={e => update("prenom", e.target.value)}
                        className={inputClass("prenom")} autoComplete="given-name"
                      />
                    </Field>
                  </div>

                  {/* Téléphone */}
                  <Field label="Téléphone" icon={<FaPhone />} error={fieldErrors.tel}>
                    <input
                      type="tel" placeholder="+216 XX XXX XXX"
                      value={formData.tel} onChange={e => update("tel", e.target.value)}
                      className={inputClass("tel")} autoComplete="tel"
                    />
                  </Field>

                  {/* Email */}
                  <Field label="Adresse email" icon={<FaEnvelope />} error={fieldErrors.email}>
                    <input
                      type="email" placeholder="votre@email.com"
                      value={formData.email} onChange={e => update("email", e.target.value)}
                      className={inputClass("email")} autoComplete="email"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="w-full bg-[#F7B500] text-[#0A2540] border-none rounded-xl py-3.5 text-[16px] font-black cursor-pointer flex items-center justify-center gap-2.5 mt-1.5 transition-all duration-200 hover:bg-[#e6a800] hover:-translate-y-0.5"
                    style={{ fontFamily: "inherit" }}
                  >
                    Continuer <FaArrowRight size={14} />
                  </button>
                </form>
              )}

              {/* ════════════════
                  ÉTAPE 2
              ════════════════ */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Rôle */}
                  <div>
                    <label className="text-[13px] font-bold text-gray-700 tracking-[0.3px] block mb-2.5">
                      Vous êtes…
                    </label>
                    <div className="flex gap-3">
                      {(["Startup", "Expert"] as Role[]).map(r => (
                        <div
                          key={r}
                          className={`role-card${formData.role === r ? " active" : ""}`}
                          onClick={() => update("role", r)}
                        >
                          <div
                            className="text-[26px] mb-2 transition-colors duration-200"
                            style={{ color: formData.role === r ? "#F7B500" : "#9CA3AF" }}
                          >
                            {r === "Startup" ? <FaRocket /> : <FaBriefcase />}
                          </div>
                          <div
                            className="font-black text-[15px]"
                            style={{ color: formData.role === r ? "#0A2540" : "#6B7280" }}
                          >{r}</div>
                          <div className="text-[12px] text-gray-400 mt-0.5">
                            {r === "Startup" ? "Chercher des experts" : "Proposer vos services"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Champs Expert */}
                  {formData.role === "Expert" && (
                    <>
                      <Field label="Domaine d'expertise" icon={<FaBriefcase />} error={fieldErrors.domaine}>
                        <input
                          type="text" placeholder="Ex: Marketing, Finance, Tech…"
                          value={formData.domaine} onChange={e => update("domaine", e.target.value)}
                          className={inputClass("domaine")}
                        />
                      </Field>

                      {/* Upload CV */}
                      <div>
                        <label className="text-[13px] font-bold text-gray-700 tracking-[0.3px] block mb-2">
                          CV (PDF) <span className="text-red-500">*</span>
                        </label>
                        <div
                          className={`upload-zone${formData.cv ? " has-file" : ""}`}
                          onClick={() => fileRef.current?.click()}
                        >
                          <input
                            ref={fileRef} type="file" accept=".pdf"
                            className="hidden"
                            onChange={e => { if (e.target.files?.[0]) update("cv", e.target.files[0]); }}
                          />
                          {formData.cv ? (
                            <div className="flex items-center justify-center gap-2.5">
                              <FaCheckCircle className="text-green-500 text-[20px]" />
                              <div className="text-left">
                                <div className="font-bold text-[#0A2540] text-[14px]">{formData.cv.name}</div>
                                <div className="text-[12px] text-gray-500">
                                  {(formData.cv.size / 1024).toFixed(0)} KB — cliquer pour changer
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <FaUpload className="text-[24px] text-gray-400 mb-2 mx-auto" />
                              <div className="font-bold text-gray-700 text-[14px]">Glisser ou cliquer pour uploader</div>
                              <div className="text-[12px] text-gray-400 mt-0.5">PDF uniquement · 5 Mo max</div>
                            </div>
                          )}
                        </div>
                        {fieldErrors.cv && (
                          <span className="text-[12px] text-red-500 flex items-center gap-1.5 font-semibold mt-1">
                            <FaTimesCircle size={11} /> {fieldErrors.cv}
                          </span>
                        )}
                      </div>
                    </>
                  )}

                  {/* Mot de passe */}
                  <Field label="Mot de passe" icon={<FaLock />} error={fieldErrors.password}>
                    <input
                      type={showPwd ? "text" : "password"}
                      placeholder="Min. 8 car., 1 maj., 1 chiffre"
                      value={formData.password} onChange={e => update("password", e.target.value)}
                      className={inputClass("password")} style={{ paddingRight: 46 }}
                      autoComplete="new-password"
                    />
                    <button
                      type="button" onClick={() => setShowPwd(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer p-1 transition-colors duration-200 hover:text-[#0A2540]"
                    >
                      {showPwd ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                    </button>
                  </Field>

                  {/* Barre de force */}
                  {formData.password && (
                    <div className="-mt-2">
                      <div className="flex gap-1.5 mb-1.5">
                        {[1, 2, 3, 4].map(i => (
                          <div
                            key={i}
                            className="pwd-bar flex-1"
                            style={{ background: i <= pwd.score ? pwd.color : "rgba(10,37,64,0.08)" }}
                          />
                        ))}
                      </div>
                      <span className="text-[12px] font-bold" style={{ color: pwd.color }}>{pwd.label}</span>
                    </div>
                  )}

                  {/* Confirmer MDP */}
                  <Field label="Confirmer le mot de passe" icon={<FaLock />} error={fieldErrors.confirmPassword}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Répétez votre mot de passe"
                      value={formData.confirmPassword} onChange={e => update("confirmPassword", e.target.value)}
                      className={inputClass("confirmPassword")} style={{ paddingRight: 46 }}
                      autoComplete="new-password"
                    />
                    <button
                      type="button" onClick={() => setShowConfirm(p => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-400 cursor-pointer p-1 transition-colors duration-200 hover:text-[#0A2540]"
                    >
                      {showConfirm ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                    </button>
                    {/* indicateur match */}
                    {formData.confirmPassword && !fieldErrors.confirmPassword && (
                      <div className="absolute right-11 top-1/2 -translate-y-1/2">
                        {formData.password === formData.confirmPassword
                          ? <FaCheckCircle className="text-green-500 text-[15px]" />
                          : <FaTimesCircle className="text-red-500 text-[15px]" />}
                      </div>
                    )}
                  </Field>

                  {/* CGU */}
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox" required
                      className="w-4 h-4 mt-0.5 flex-shrink-0 cursor-pointer accent-[#F7B500]"
                    />
                    <span className="text-[13px] text-gray-500 leading-relaxed">
                      J&apos;accepte les{" "}
                      <a href="#" className="text-[#F7B500] font-bold no-underline hover:underline">Conditions d&apos;utilisation</a>
                      {" "}et la{" "}
                      <a href="#" className="text-[#F7B500] font-bold no-underline hover:underline">Politique de confidentialité</a>
                    </span>
                  </label>

                  {/* Boutons */}
                  <div className="flex flex-col gap-2.5 mt-1">
                    <button
                      type="submit" disabled={loading}
                      className="w-full bg-[#F7B500] text-[#0A2540] border-none rounded-xl py-3.5 text-[16px] font-black cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:enabled:bg-[#e6a800] hover:enabled:-translate-y-0.5"
                      style={{ fontFamily: "inherit" }}
                    >
                      {loading
                        ? <div className="spinner" />
                        : <><FaCheckCircle size={15} /> Créer mon compte</>}
                    </button>
                    <button
                      type="button" onClick={() => setStep(1)}
                      className="w-full bg-transparent text-[#0A2540] border border-[#0A2540]/15 rounded-xl py-3 text-[15px] font-bold cursor-pointer transition-all duration-200 hover:border-[#0A2540] hover:bg-[#0A2540]/[0.04]"
                      style={{ fontFamily: "inherit" }}
                    >
                      ← Retour
                    </button>
                  </div>
                </form>
              )}

              {/* ── PIED CARTE ── */}
              <p className="text-center mt-6 text-[14px] text-gray-500">
                Déjà un compte ?{" "}
                <Link href="/connexion" className="text-[#F7B500] font-bold no-underline hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          )}

          <p className="text-center mt-5 text-[12px] text-white/30 leading-relaxed">
            Vos données sont protégées conformément au RGPD.{" "}
            <a href="#" className="text-[#F7B500]/55 no-underline hover:underline">En savoir plus</a>
          </p>
        </div>
      </main>
    </div>
  );
}