# HiClean – site one-page (maquette de présentation)

Site statique : `index.html` + dossier `assets/`. Aucun build, aucune dépendance.

## Déploiement
1. Pousser le dossier sur GitHub.
2. Vercel > Add New > Project > importer le dépôt. Framework Preset : **Other**. Build command et output directory : vides.
3. Deploy.

## Avant la mise en ligne définitive
- Retirer la ligne `<meta name="robots" content="noindex, nofollow">` dans `index.html` (sinon Google n'indexera pas le site).
- Compléter les champs surlignés en jaune (`mark.tbd`) : mentions légales, BCE, TVA, hébergeur, durée de conservation.
- Brancher le formulaire sur un vrai service (Formspree, etc.) puis mettre à jour la politique de confidentialité.
- Remplacer les photos d'illustration Unsplash (`polish`, `tape`, `head`) par celles du client.
- Ajouter une image Open Graph, `sitemap.xml` et `robots.txt` une fois le domaine hiclean.be branché.
- Faire valider les textes légaux par le client ou un professionnel.
