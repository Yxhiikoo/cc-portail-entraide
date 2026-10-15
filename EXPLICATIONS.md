# EXPLICATIONS — CC A2 S2 Portail d'entraide

**Nom / Prénom :** GRANIER Gabriel
**Identité Git utilisée :** GGranier <gabavzb2@gmail.com>

## 1. Reprise et diagnostic initial

- Archive extraite dans un dossier neuf, dossier `.git` conservé. `git status` : branche `main`, arbre propre, aucun dépôt distant.
- Commit initial de `main` : `4a266e1` « Créer le portail et le simulateur de créneaux ».
- **Commit de départ** (tête de `main` à la reprise) : `76184a8` « Ajouter le conseil de vérification du compteur ».
- `feature/tutorat` (`a43f314`) part aussi de `76184a8`.
- Test initial sur `76184a8` : durée affichée **200** minutes ; 2 clics → 2 créneaux · 400 minutes ; Recommencer → 0 · 0. L'erreur de durée est donc déjà présente au départ (introduite par `b88cc98`).

## 2. Branches

| Branche | Rôle | Point de départ |
|---|---|---|
| `feature/accueil` | Annoncer l'accueil libre sans inscription le jeudi à 16 h | `76184a8` |
| `feature/contact` | Rendre l'adresse de contact cliquable (`mailto:`) | `76184a8` |
| `feature/tutorat` | Contribution fournie : tutorat individuel sur inscription à 16 h 30 | `76184a8` |
| `hotfix/duree` | Annuler la durée erronée de 200 minutes | `b20c562` (main après intégration) |

## 3. Mes changements

- `e188c6d` (feature/accueil) — paragraphe `#permanence` : « Accueil libre sans inscription le jeudi à 16 h. »
- `535434e` (feature/contact) — `entraide@example.org` entouré d'un lien `<a href="mailto:entraide@example.org">`.
- Intégration dans `main` : `feature/accueil` en avance rapide (fast-forward), puis `feature/contact` par le commit de fusion `aeb909c` (parents `e188c6d` et `535434e`), sans conflit car les lignes modifiées sont différentes.

## 4. Conflit et décision de contenu

- Fusion de `feature/tutorat` dans `main` : **conflit** dans `index.html`, paragraphe `#permanence`.
- Pourquoi : les deux histoires ont divergé depuis `76184a8` ; `e188c6d` et `a43f314` ont chacune réécrit **la même ligne** (« Permanence le jeudi à 16 h. ») différemment. Git ne peut pas choisir seul.
- Décision : garder les deux informations dans deux paragraphes distincts :
  - `#permanence` : Accueil libre sans inscription le jeudi à 16 h.
  - `#tutorat` : Tutorat individuel sur inscription le jeudi à 16 h 30.
- Contact cliquable conservé. Plus aucun marqueur `<<<<<<<`, `=======`, `>>>>>>>` ; `git status` propre.
- **Commit de fusion du conflit : `b20c562`**, parents `aeb909c` (main) et `a43f314` (feature/tutorat) — vérifié avec `git log -1 --format=%P b20c562`.

## 5. Réparation ciblée

- Commit annulé : `b88cc98bf3fae11998895be8365305f22b2cc49c` — `app.js` : `dureeCreneau = 20` → `200`.
- Apport ultérieur conservé : `76184a8` (section « Conseil de vérification » du README).
- `hotfix/duree` créée depuis `main` (`b20c562`), puis `git revert b88cc98` → **commit d'annulation `a65f0a2`** (`200` → `20`). L'histoire existante n'est ni supprimée ni réécrite, car elle est considérée comme partagée.
- Réunion dans `main` : avance rapide `b20c562` → `a65f0a2`.

## 6. Tests avant / après

| Test | Attendu | Observé avant (`76184a8`) | Observé après (`a65f0a2`) |
|---|---|---|---|
| Durée d'un créneau | 20 | 200 ❌ | 20 ✅ |
| 2 clics sur Ajouter | 2 créneaux · 40 min | 2 · 400 ❌ | 2 · 40 ✅ |
| Recommencer | 0 · 0 | 0 · 0 ✅ | 0 · 0 ✅ |
| Permanences | accueil 16 h + tutorat 16 h 30 | une seule ligne | les deux ✅ |
| Contact | lien mailto | texte simple | cliquable ✅ |
| README | conseil présent | présent | présent ✅ |

Méthode de test :
- **Avant** (`76184a8`) et **après** (`a65f0a2`) : petit script Node qui charge `app.js` avec un DOM simulé, clique deux fois sur Ajouter, puis sur Recommencer. Les résultats sont ceux du tableau.
- **Après, dans un vrai navigateur** (`index.html` servi en local) : durée affichée **20 minutes** ; après 2 clics, « 2 créneau(x) · 40 minute(s) » ; après Recommencer, « 0 créneau(x) · 0 minute(s) ». Les deux permanences sont affichées et l'adresse de contact est un lien `mailto:entraide@example.org`.

## 7. Difficultés

- **Fins de ligne :** les fichiers sont stockés en CRLF. Ma première modification avec `sed` a converti le fichier en LF : le commit modifiait les 40 lignes au lieu d'une seule, ce qui aurait provoqué un conflit sur tout le fichier.
  - Tentative : `git diff --stat` a montré « 40 insertions, 40 deletions ». Ces commits n'étaient pas encore partagés ; j'ai remis les deux branches sur `76184a8` (`git reset --hard`) et refait les modifications en conservant le CRLF.
  - Résultat et vérification : `e188c6d` et `535434e` affichent « 1 insertion, 1 deletion » ; le conflit ne porte ensuite que sur la ligne attendue.
- Aucune autre difficulté.

## 8. Publication

- Dépôt public : https://github.com/Yxhiikoo/cc-portail-entraide (accessible sans connexion, vérifié en HTTP 200 depuis un client non authentifié).
- Branches publiées : `main`, `feature/accueil` (`e188c6d`), `feature/contact` (`535434e`), `feature/tutorat` (`a43f314`), `hotfix/duree` (`a65f0a2`).
- Premier push vérifié : `main` = `b848710` en local (`git rev-parse main`) et sur GitHub (API `commits/main`).
- Dernier `main` : c'est le commit qui ajoute ce fichier complété. Son identifiant, vérifié en local et sur GitHub, figure dans le message de remise.

## 9. Aides utilisées

- **Outil :** Claude (Claude Code), en séance d'entraînement.
- **Question :** réaliser le CC pas à pas avec explications.
- **Aide reçue :** commandes de branches, de fusion et de `git revert`, résolution du conflit, script de test du simulateur, détection du problème CRLF.
- **Décision :** aide retenue ; commits concernés : `e188c6d`, `535434e`, `aeb909c`, `b20c562`, `a65f0a2` et ce fichier.
- **Vérification personnelle :** à refaire moi-même — parents de `b20c562` dans `git log --graph`, `git show a65f0a2`, test 2 clics puis Recommencer dans le navigateur, comparaison de `git rev-parse main` avec GitHub.
- **Ressources :** documentation Git (`git merge`, `git revert`).
