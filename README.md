# TourismHub

Application personnelle d'apprentissage pour monter en compétence sur le
métier de travel agent / agency management, à travers 9 modules structurés.
Construite en parallèle d'un vrai poste (OnSpot Travel), avec l'objectif
d'évoluer vers un rôle de management ou de création d'agence.

## Stack technique

- **Next.js** (App Router) + **TypeScript** — framework web, routing basé sur
  les dossiers, exécution côté serveur par défaut (Server Components).
- **Tailwind CSS** — styles utilitaires directement dans le JSX.
- **Supabase** — base de données PostgreSQL hébergée + client JS
  (`@supabase/supabase-js`) pour stocker et lire les cours.

## Logique d'architecture (le *why*, pas juste le *quoi*)

Le code applicatif vit dans `src/`, découpé en 4 zones qui ont chacune une
seule responsabilité — inspiré du même principe que le projet LifeOS :

```
src/
├── app/          → routes uniquement (pages, layouts). Reste "fin" :
│                   assemble des morceaux venant d'ailleurs, ne contient
│                   pas la logique métier elle-même.
├── core/         → logique non-visuelle : config, connexion Supabase.
│                   Ne dépend jamais de React.
├── modules/      → une fonctionnalité métier par sous-dossier
│                   (ex: courses/, dashboard/). Regroupe composants,
│                   logique et accès aux données propres à cette
│                   fonctionnalité.
└── shared/       → composants/utilitaires réutilisés par plusieurs
                    modules. Si un composant sert un seul module, il
                    reste dans ce module, pas ici.
```

**Pourquoi cette séparation ?** Next.js pousse naturellement à tout entasser
dans `app/`. Sans discipline, ce dossier devient vite illisible au fil des
pages. En séparant données, logique et affichage dès le départ, chaque
nouveau fichier a une place évidente, et on peut remplacer une source de
données (ex: passer d'une liste statique à une vraie table Supabase) sans
toucher aux composants qui l'affichent.

## État actuel du projet

- ✅ Projet Next.js + TypeScript + Tailwind opérationnel
- ✅ Structure `core/` `modules/` `shared/` en place
- ✅ Dashboard listant les 9 modules (`core/config/modules.ts` = source de
  vérité unique pour la liste des modules)
- ✅ Navigation dynamique : `/modules/[slug]` gère toutes les pages de
  module via une seule route (dynamic routing)
- ✅ Connexion Supabase fonctionnelle (`core/supabase/client.ts`)
- ✅ Table `courses` créée, cours affichés dynamiquement par module
  (`modules/courses/getCoursesByModule.ts`)
- ⚠️ Row Level Security (RLS) activée sur `courses`, mais avec lecture ET
  écriture publiques (policy `anon`) — acceptable tant que l'app n'est pas
  déployée. **Important : rendre le repo GitHub privé ne protège PAS
  l'app une fois déployée** — la clé Supabase `anon` est exposée côté
  client par design, donc une écriture publique reste possible depuis
  n'importe quel navigateur visitant l'URL déployée, repo privé ou non.
  Une vraie protection nécessite une authentification (Supabase Auth) —
  à faire avant tout déploiement public sur Vercel.

## Méthode de travail

1. On avance une étape à la fois, testable et commitée avant de passer à
   la suivante.
2. Le code est modifié via des commandes heredoc bash plutôt que de
   l'édition manuelle, pour limiter les erreurs de syntaxe.
3. Chaque fichier a une fonction claire et documentée — objectif :
   pouvoir toujours expliquer à quoi sert n'importe quel fichier du repo.
4. `.env.local` contient les clés Supabase et n'est **jamais** commité
   (exclu via `.gitignore`) — à recréer manuellement sur chaque nouvel
   environnement de travail (ex: un nouveau Codespace).

## Prochaines étapes envisagées

- Sécuriser la table `courses` avec des règles RLS
- Rendu Markdown propre pour le contenu des cours (actuellement affiché
  en texte brut)
- Intégration de la skill `travel-course-generator` pour peupler la base
  avec de vrais cours générés depuis des documents/sources
- Design et direction artistique (une fois la structure fonctionnelle
  validée dans son ensemble)
