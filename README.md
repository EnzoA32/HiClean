# HiClean Detailing – site vitrine

Site statique (HTML, CSS, JS), sans étape de build.

```
index.html      pages : accueil, tarifs, galerie, réservation (navigation par #ancres)
style.css       styles
cine.js         héro animé au scroll (vidéos pilotées par le scroll)
script.js       animations, galerie, formulaire, tarifs
assets/         images, logo et vidéo
```

## Déploiement
Importer le dépôt GitHub dans Vercel (ou Netlify / GitHub Pages) : aucun réglage nécessaire.

## Renseigner les tarifs
Dans `script.js`, remplir l'objet `TARIFS`, par exemple :
`const TARIFS={'SUV / 4x4':{'Polissage':'dès 250 €'}};`
Les prix apparaissent sur la page Tarifs et dans le récapitulatif de réservation. Sans valeur, « Sur devis » s'affiche.

## À faire avant la mise en ligne
- Remplacer les photos Unsplash par celles du client (voir `assets/`).
- Vérifier l'adresse e-mail de réception (`contact@hiclean.be`) dans `script.js` et `index.html`.
- Pour un meilleur référencement, passer à de vraies URLs (/tarifs, /galerie, /reservation) avec un titre et une description par page.

## Héro animé
Le héro (`#cine`) enchaîne 5 étapes au scroll : lavage, zoom, polissage, pose de céramique, dézoom final. Fichiers : `assets/cine-*.webp` et `assets/cine-zoom.mp4`, `assets/cine-ceramique.mp4` (encodés image-clé à chaque image pour un scrub fluide).
- Les deux vidéos portent encore le filigrane Kling : à remplacer par des exports sans filigrane avant la mise en ligne (mêmes noms de fichiers).
- La durée du scroll se règle avec `height` de `.cine` dans `style.css` (1000vh desktop, 760vh mobile).
