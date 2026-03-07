"use client";
import { useState } from "react";
import Link from "next/link";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple
    if (!email || !password) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    // Ici tu peux faire appel à ton API pour vérifier les identifiants
    // Exemple temporaire :
    if (email === "test@startup.com" && password === "123456") {
      setError("");
      alert("Connexion réussie !");
      // rediriger vers tableau de bord, par ex. router.push("/dashboard")
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Se connecter</h2>

        {error && <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-[#F7B500] text-[#0A2540] p-3 rounded-lg font-semibold hover:bg-[#E0A700] transition-colors"
          >
            Se connecter
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <Link href="#" className="hover:underline text-[#F7B500]">
            Mot de passe oublié ?
          </Link>
          <Link href="/inscription" className="hover:underline text-[hsl(219,63%,18%)]">
            Vous n’avez pas de compte ? S’inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}