# Cabinet Medical

## Description
Cabinet Medical est une application mobile multiplateforme pour la gestion des rendez-vous, consultations et échanges de documents médicaux. L'application est accessible aux patients et au personnel médical, avec des fonctionnalités spécifiques pour chaque type d'utilisateur.

## Fonctionnalités
### Pour les patients :
1. **Prise de rendez-vous** :
  - Consulter les créneaux disponibles par médecin.
  - Prendre un rendez-vous en sélectionnant la date, l'heure et le médecin.
  - Recevoir une confirmation de rendez-vous (par notification ou email).
2. **Envoi de documents médicaux** :
  - Télécharger et envoyer des documents tels que des radios, des résultats de laboratoire, ou tout autre fichier médical.
  - Lister les documents envoyés et leur statut (consulté ou non par le médecin).
3. **Historique médical personnel** :
  - Consulter l’historique des rendez-vous et des consultations.
  - Voir les diagnostics et les prescriptions.
4. **Notifications** :
  - Recevoir des rappels pour les rendez-vous à venir.
  - Être notifié lorsque les documents sont consultés par le médecin.

### Pour le personnel médical :
1. **Gestion des rendez-vous** :
  - Voir les demandes de rendez-vous des patients et les accepter/rejeter.
  - Modifier ou annuler les rendez-vous en fonction des disponibilités.
  - Visualiser les rendez-vous sous forme de calendrier.
2. **Consultation des documents** :
  - Accéder aux documents envoyés par les patients.
  - Ajouter des annotations ou remarques sur les documents consultés.
3. **Gestion des consultations** :
  - Enregistrer les diagnostics et les prescriptions pour chaque consultation.
  - Associer des documents aux consultations pour un meilleur suivi médical.
4. **Profil utilisateur** :
  - Mettre à jour leurs informations personnelles.
  - Gérer les horaires de disponibilité.

## Le design

L'application reprend **la papeterie du cabinet** : ce que le patient tient
vraiment en main chez son médecin. Aucun élément ne vient d'un tableau de bord
générique.

- **La carte de rendez-vous** (`src/app/shared/rdv-card.component.ts`) est
  l'élément signature. Chaque rendez-vous est une carte à détacher : un talon
  avec le jour, la date et le mois, un bord perforé avec ses encoches, puis le
  qui / pourquoi / à quelle heure. Un tampon indique *Confirmé*, *En attente*
  ou *Refusé*. Les actions (confirmer, refuser, voir la fiche) sont sur la
  partie détachable. La même carte sert au patient, au médecin et à la
  confirmation de réservation.
- **Le papier à en-tête d'ordonnance**, pour la connexion et l'inscription :
  le logo, le nom du cabinet et le double filet sous l'en-tête.
- **Le dossier patient** : la fiche patient et la fiche médecin ont un onglet
  de chemise cartonnée. Les informations sont des lignes pointillées
  intitulé / valeur, comme sur un formulaire.
- **Le carnet de santé** pour l'historique, avec le « Rx » dans le coin.
- **La plaque de porte** pour chaque médecin de l'annuaire, et le tableau
  hebdomadaire des horaires sur sa page.

**Palette** : définie une fois dans `src/theme/variables.scss` (tokens `--cm-*`,
branchés sur la palette Ionic). Chaque couleur a un seul rôle.

| Token | Hex | Rôle |
| --- | --- | --- |
| `--cm-paper` | `#f7f5ef` | fond de page |
| `--cm-card` | `#fffefa` | cartes et fiches |
| `--cm-rule` | `#d9d3c6` | filets, perforations, bordures |
| `--cm-ink` | `#1d2b36` | texte |
| `--cm-muted` | `#6c7680` | texte secondaire |
| `--cm-teal` | `#0f7c7a` | actions, tampon *Confirmé* (`primary`) |
| `--cm-mint` | `#e2f0ed` | talon de la carte, éléments sélectionnés |
| `--cm-iodine` | `#c9821a` | tampon *En attente* (`warning`) |
| `--cm-stamp` | `#c23b35` | tampon *Refusé*, suppression (`danger`) |

Le mode sombre (`body.dark`, activé dans les Paramètres) redéfinit les mêmes
tokens.

**Typographie** : trois rôles. *Fraunces* pour les titres et les noms,
*Atkinson Hyperlegible* pour le texte (elle a été dessinée pour les lecteurs
malvoyants, ce qui compte pour une application de santé), et *Red Hat Mono*
pour les intitulés, les dates et les heures. Toutes sont auto-hébergées via
`@fontsource`.

**Mouvement** : le dossier médical s'ouvre quand il contient des documents, et
les barres des statistiques montent au chargement. Rien d'autre ne bouge. Avec
`prefers-reduced-motion`, tout s'affiche directement à sa place.

### Repris de component-lab

| Composant | Utilisé pour |
| --- | --- |
| `folder.tsx` | `shared/dossier-folder.component.ts` : le dossier médical sur la page Documents. Porté de React/motion vers Angular ; le panneau arrière, les trois feuilles qui s'écartent et le rabat qui bascule sont conservés. Il est recoloré en chemise kraft et affiche le nombre de documents sur l'étiquette |
| `stats-card.tsx` | `shared/stat-card.component.ts` : le tableau de bord admin. La valeur principale et les barres qui montent sont conservées ; chaque barre porte la couleur de son tampon |

Construits pour ce design : la carte de rendez-vous, l'en-tête d'ordonnance,
les fiches à onglet, le carnet de santé et les tampons. Écartés : les champs de
chat animés (la messagerie reste une simple conversation), les graphiques
`metric-chart` / `line-graph-statistics` (trop « tableau de bord » pour un
cabinet) et les effets décoratifs (`flickering-grid`, `pixel-trail`,
`spotlight`), qui ne conviennent pas à une application de santé.

## Prérequis
- Node.js et npm
- Angular CLI
- Python 3.x
- Pip (gestionnaire de paquets Python)
- MongoDB
- SQLite
- Firebase Cloud Messaging (FCM)

## Installation

### Backend
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/RayenMalouche/Application-mobile-de-gestion-de-cabinet-medical-avec-Ionic.git
   cd CabinetMedicalProject

## Installation

### Backend
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/RayenMalouche/Application-mobile-de-gestion-de-cabinet-medical-avec-Ionic.git
   cd CabinetMedical/BackendCabinetMedical/pythonProject
   
2. Créez un environnement virtuel :
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
3. Installez les dépendances :
   ```bash
   pip install -r requirements.txt
   ```
4. Créez la base de données :
   ```medic_db 
   
5. Lancez le serveur :
   ```bash
   flask run
   ```

### Frontend
1. Allez dans le répertoire du frontend : 
   ```bash
   cd CabinetMedical/CabinetMedical
   ```
1. Installez les dépendances :
   ```bash
    npm install
   ```
2. Lancez l'application :
   ```bash
   ionic serve
   ```