// app/api/supabase-test/route.ts
//
// Route TEMPORAIRE, juste pour vérifier que la connexion à Supabase
// fonctionne. À supprimer une fois le test validé.

import { NextResponse } from "next/server";
import { supabase } from "@/core/supabase/client";

export async function GET() {
  const { error } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Supabase connection works." });
}
