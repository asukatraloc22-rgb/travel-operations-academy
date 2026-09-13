// app/manifest.ts
//
// Convention Next.js : ce fichier, à cet emplacement précis, génère
// automatiquement /manifest.webmanifest — le fichier que le navigateur
// lit pour savoir comment installer l'app (nom, icônes, couleurs, mode
// d'affichage une fois installée).

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Travel Operations Academy",
    short_name: "TOA",
    description:
      "Parcours d'apprentissage structuré en 9 modules pour progresser dans le métier de travel agent.",
    start_url: "/",
    display: "standalone", // s'affiche comme une vraie app, sans barre d'adresse
    background_color: "#ffffff",
    theme_color: "#111111",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
