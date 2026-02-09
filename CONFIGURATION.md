# 📋 CHECKLIST DE CONFIGURATION

Suivez ces étapes dans l'ordre pour configurer votre Quiz de Saint-Valentin :

## ✅ Étape 1 : Google Sheet
- [ ] Créer un nouveau Google Sheet
- [ ] Copier l'ID du Sheet depuis l'URL
- [ ] ID copié : `153sKjCsO8C7hD5Eenw7Y6pFYN7RZI3_J4l1YKweGskU`

## ✅ Étape 2 : Google Apps Script
- [ ] Ouvrir script.google.com
- [ ] Créer un nouveau projet
- [ ] Coller le code de `google-apps-script.js`
- [ ] Remplacer `SHEET_ID` par l'ID copié ci-dessus
- [ ] Remplacer `SENDER_EMAIL` par votre email Gmail
- [ ] Sauvegarder le projet

## ✅ Étape 3 : Déploiement Web App
- [ ] Cliquer sur "Déployer" > "Nouveau déploiement"
- [ ] Sélectionner "Application Web"
- [ ] Configuration :
  - Exécuter en tant que : **Moi**
  - Qui peut y accéder : **Tout le monde**
- [ ] Cliquer "Déployer"
- [ ] Autoriser les permissions
- [ ] Copier l'URL du déploiement
- [ ] URL copiée : `https://script.google.com/macros/s/AKfycbyaFo-IlNEURcY-03H4bltf5H01AoQUQxu2dml18ctD9fYliqp7PlEt7UirMuf0UpjwnA/exec`

## ✅ Étape 4 : Configuration du site
- [ ] Ouvrir `script.js`
- [ ] Remplacer `GOOGLE_SCRIPT_URL` par l'URL copiée ci-dessus
- [ ] Remplacer `RECIPIENT_EMAIL` par l'email destinataire du récap
- [ ] Sauvegarder le fichier

## ✅ Étape 5 : Test local
- [ ] Ouvrir `index.html` dans le navigateur
- [ ] Tester le quiz complet
- [ ] Vérifier le Google Sheet : les données sont présentes
- [ ] Vérifier l'email : le récap est reçu

## ✅ Étape 6 : Déploiement GitHub Pages
- [ ] Créer un repository GitHub
- [ ] Uploader les fichiers (index.html, styles.css, script.js)
- [ ] Activer GitHub Pages dans Settings
- [ ] Visiter l'URL : `https://USERNAME.github.io/REPO-NAME/`
- [ ] Tester en ligne

---

## 🔧 VALEURS À CONFIGURER

### Dans `google-apps-script.js` :
```javascript
const SHEET_ID = 'REMPLACER_PAR_VOTRE_SHEET_ID';
const SENDER_EMAIL = 'REMPLACER_PAR_VOTRE_EMAIL@gmail.com';
```

### Dans `script.js` :
```javascript
const GOOGLE_SCRIPT_URL = 'REMPLACER_PAR_URL_DU_DEPLOIEMENT';
const RECIPIENT_EMAIL = 'REMPLACER_PAR_EMAIL_DESTINATAIRE@example.com';
```

---

## 📝 NOTES

Date de configuration : ________________

Problèmes rencontrés :
_________________________________________________
_________________________________________________
_________________________________________________

Solutions appliquées :
_________________________________________________
_________________________________________________
_________________________________________________

---

## 🎯 APRÈS LA CONFIGURATION

Une fois tout configuré et testé :
- ✅ Personnaliser les questions si nécessaire
- ✅ Ajuster les couleurs selon vos préférences
- ✅ Tester sur mobile et desktop
- ✅ Partager le lien avec votre Valentine ! 💖

---

**Tout est prêt ? C'est parti pour la Saint-Valentin ! 💝**
