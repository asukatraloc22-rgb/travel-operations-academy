// modules/auth/LoginForm.tsx
//
// "use client": form interactivity + a Supabase Auth call. No signup
// flow here on purpose — this app has exactly one owner account,
// created manually in the Supabase dashboard, not through the app.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/core/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (signInError) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-nature-500)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[var(--color-text)]">
          Mot de passe
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-nature-500)]"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-[var(--color-nature-600)] text-white px-4 py-2 text-sm font-medium hover:bg-[var(--color-nature-700)] transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
