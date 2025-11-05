
# Mon_Portfolio

Ce dépôt contient mon portfolio web personnel. Il s'agit d'un petit site statique/dynamique conçu pour présenter mes projets, mon CV et permettre aux visiteurs de me contacter.

## Aperçu

- Page d'accueil : `index.html` — présentation, sections « À propos », projets, compétences.
- Formulaire de contact : `contact.php` — envoi de messages depuis le site (nécessite un serveur local ou hébergeur supportant PHP).
- Style : `style.css` — styles CSS principaux.
- Scripts : `scripts.js` — interactions JavaScript simples.

## Technologies

- HTML5
- CSS3
- JavaScript
- PHP (pour le formulaire de contact)

## Structure du projet

```
Mon_Portfolio/
├─ index.html         # Page d'accueil
├─ contact.php        # Traitement du formulaire de contact
├─ style.css          # Feuille de styles
└─ scripts.js         # Code JS
```

## Installation & utilisation (Windows, XAMPP)

1. Copier le dossier `Mon_Portfolio` dans le répertoire web de XAMPP :

	- Pour votre configuration : `c:\xampp_lite_5_6\www\Mon_Portfolio`

2. Démarrer le serveur Apache (via le panneau XAMPP Lite).

3. Ouvrir votre navigateur et aller sur :

	`http://localhost/Mon_Portfolio/index.html`

Remarque : le formulaire de contact (`contact.php`) nécessite que PHP soit actif sur le serveur local. Sur un hébergement distant, configurez les paramètres de mail si nécessaire.

## Personnalisation

- Pour remplacer le contenu (texte, images, projets), éditez `index.html` et les ressources correspondantes.
- Pour modifier le style global, éditez `style.css`.
- Pour ajouter des interactions, éditez `scripts.js`.

## Développement

- Ouvrez les fichiers dans votre éditeur (VS Code, Sublime, etc.).
- Recharger la page dans le navigateur après chaque modification pour voir les changements.

## Contribution

Si vous souhaitez proposer des améliorations (corrections, mise en forme, nouvelles sections), ouvrez une issue ou envoyez un patch.

## Contact

- Le formulaire de contact du site: `contact.php`.
- Vous pouvez aussi ajouter un lien vers votre adresse e-mail ou profils (LinkedIn, GitHub) dans `index.html` si vous le souhaitez.

## Licence

Ce projet est fourni sans licence explicite. Si vous souhaitez le partager publiquement, ajoutez un fichier `LICENSE` (par exemple MIT) selon vos préférences.
