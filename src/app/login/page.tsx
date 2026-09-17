// app/login/page.tsx

import { LoginForm } from "@/modules/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="max-w-sm mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-8">Connexion</h1>
      <LoginForm />
    </main>
  );
}
