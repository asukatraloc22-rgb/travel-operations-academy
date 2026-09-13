# modules/

Un sous-dossier par fonctionnalité métier de l'app (ex: modules/courses, modules/dashboard).

Chaque sous-dossier regroupe tout ce qui concerne CETTE fonctionnalité :
composants spécifiques, logique, types. Les pages dans src/app/ importent
depuis ici plutôt que de contenir la logique elles-mêmes.
