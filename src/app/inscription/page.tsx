"use client";
import { useState } from "react";
import Link from "next/link";

export default function Inscription() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    tel: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Startup",
    domaine: "",
    cv: null as File | null,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "cv" && files) {
      setFormData({ ...formData, cv: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Validation simple
    if (!formData.nom) newErrors.push("Le nom est obligatoire.");
    if (!formData.prenom) newErrors.push("Le prénom est obligatoire.");
    if (!formData.tel) newErrors.push("Le numéro de téléphone est obligatoire.");
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.push("Email invalide.");
    if (!formData.password) newErrors.push("Le mot de passe est obligatoire.");
    if (formData.password !== formData.confirmPassword) newErrors.push("Les mots de passe ne correspondent pas.");
    if (formData.role === "Expert" && !formData.domaine) newErrors.push("Le domaine est obligatoire pour les experts.");
    if (formData.role === "Expert" && !formData.cv) newErrors.push("Le CV est obligatoire pour les experts.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setSuccess("");
      return;
    }

    // Ici tu peux envoyer les données au serveur
    setErrors([]);
    setSuccess("Inscription réussie !");
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte</h2>

        {errors.length > 0 && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
            <ul>
              {errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          </div>
        )}
        {success && <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg"
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg"
            />
          </div>

          <input
            type="text"
            name="tel"
            placeholder="Numéro de téléphone"
            value={formData.tel}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="Startup">Startup</option>
            <option value="Expert">Expert</option>
          </select>

          {formData.role === "Expert" && (
            <>
              <input
                type="text"
                name="domaine"
                placeholder="Domaine"
                value={formData.domaine}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="file"
                name="cv"
                accept=".pdf"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                 placeholder="Importer cv "
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[#F7B500] text-[#0A2540] p-3 rounded-lg font-semibold hover:bg-[#E0A700] transition-colors"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Vous avez déjà un compte ?{" "}
          <Link href="/connexion" className="text-[#F7B500] font-semibold hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}