# 💝 Quiz de Saint-Valentin Interactif

Un quiz romantique et mignon avec enregistrement des réponses dans Google Sheets et envoi d'email récapitulatif !

## 🌟 Fonctionnalités

✨ **Quiz interactif** avec 5 questions personnalisables
💕 **Première question spéciale** : "Veux-tu être ma Valentine ?"
  - Le bouton "Non" fuit la souris 🏃
  - Le bouton "Oui" grossit progressivement 📈
  - Le bouton "Non" est impossible à cliquer !

📊 **Enregistrement automatique** dans Google Sheets
📧 **Email récapitulatif** envoyé automatiquement avec toutes les réponses
🎨 **Design mignon** inspiré Hello Kitty / Charlotte aux fraises
📱 **Responsive** : fonctionne sur mobile et desktop
🌈 **Animations douces** et interface fluide

---

## 📋 Guide d'installation complet

### Étape 1 : Créer le Google Sheet

1. Allez sur [Google Sheets](https://sheets.google.com)
2. Créez un nouveau tableur
3. Nommez-le "Quiz Saint-Valentin Réponses"
4. Notez l'**ID du Sheet** dans l'URL :
   ```
   https://docs.google.com/spreadsheets/d/COPIEZ_CET_ID_ICI/edit
   ```

### Étape 2 : Configurer Google Apps Script

1. Ouvrez [Google Apps Script](https://script.google.com)
2. Cliquez sur **"Nouveau projet"**
3. Collez le contenu du fichier `google-apps-script.js`
4. **Modifiez ces lignes** :
   ```javascript
   const SHEET_ID = 'VOTRE_SHEET_ID_ICI'; // L'ID copié à l'étape 1
   const SENDER_EMAIL = 'votre.email@gmail.com'; // Votre email Gmail
   ```
5. Sauvegardez le projet (Ctrl+S ou Cmd+S)

### Étape 3 : Déployer le script comme Web App

1. Dans Google Apps Script, cliquez sur **"Déployer"** > **"Nouveau déploiement"**
2. Cliquez sur l'icône ⚙️ et sélectionnez **"Application Web"**
3. Configuration :
   - **Description** : Quiz Saint-Valentin
   - **Exécuter en tant que** : Moi
   - **Qui peut y accéder** : Tout le monde
4. Cliquez sur **"Déployer"**
5. **Autorisez l'accès** (Google va demander des permissions)
6. **Copiez l'URL du déploiement** (elle ressemble à ceci) :
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```

### Étape 4 : Configurer le site web

1. Ouvrez le fichier `script.js`
2. **Modifiez ces lignes** :
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/VOTRE_SCRIPT_ID/exec';
   const RECIPIENT_EMAIL = 'email.destinataire@example.com'; // Email qui recevra le récap
   ```

### Étape 5 : Tester localement

1. Ouvrez le fichier `index.html` dans votre navigateur
2. Testez le quiz
3. Vérifiez que :
   - Le bouton "Non" fuit bien la souris ✅
   - Le bouton "Oui" grossit ✅
   - Les réponses sont enregistrées dans le Google Sheet ✅
   - L'email est bien reçu ✅

### Étape 6 : Déployer sur GitHub Pages

1. Créez un nouveau repository GitHub
2. Uploadez ces fichiers :
   - `index.html`
   - `styles.css`
   - `script.js`
3. Allez dans **Settings** > **Pages**
4. Source : **Deploy from a branch**
5. Branch : **main** / Folder : **/ (root)**
6. Sauvegardez
7. Votre site sera accessible à :
   ```
   https://votre-username.github.io/nom-du-repo/
   ```

---

## 🎨 Personnalisation

### Ajouter des questions

Dans `script.js`, modifiez le tableau `questions` :

```javascript
const questions = [
    // Première question (NE PAS MODIFIER le isFirstQuestion)
    {
        id: 1,
        text: "Veux-tu être ma Valentine ? 💕",
        answers: [
            { text: "Oui ! 💖", value: "oui", isYes: true },
            { text: "Non 😢", value: "non", isNo: true }
        ],
        isFirstQuestion: true
    },
    // Ajoutez vos questions ici
    {
        id: 2,
        text: "Votre nouvelle question ?",
        answers: [
            { text: "Réponse A", value: "reponse_a" },
            { text: "Réponse B", value: "reponse_b" }
        ]
    }
    // ... autant de questions que vous voulez !
];
```

### Modifier les couleurs

Dans `styles.css`, modifiez les variables CSS :

```css
:root {
    --pink-light: #FFE5EC;    /* Rose clair */
    --pink-soft: #FFB3C6;     /* Rose doux */
    --pink-medium: #FF8FAB;   /* Rose moyen */
    --pink-dark: #FB6F92;     /* Rose foncé */
    --pink-accent: #FF69B4;   /* Rose accent */
    --purple-light: #E8D5F2;  /* Violet clair */
    --cream: #FFF5F7;         /* Crème */
}
```

---

## 📊 Structure du Google Sheet

Le script crée automatiquement un onglet "Réponses" avec cette structure :

| Horodatage | Session ID | Email | Question 1 | Réponse 1 | Question 2 | Réponse 2 | ... |
|------------|------------|-------|------------|-----------|------------|-----------|-----|
| 09/02/2026 10:30 | session_123... | email@... | Veux-tu... | Oui ! 💖 | Quel type... | Dîner... | ... |

---

## 📧 Format de l'email récapitulatif

L'email envoyé contient :
- 💝 Un design HTML mignon et coloré
- 📅 Date et heure de complétion
- 🆔 ID de session unique
- ✨ Toutes les questions et réponses formatées joliment

---

## 🐛 Dépannage

### L'email ne s'envoie pas

1. Vérifiez que `RECIPIENT_EMAIL` est correct dans `script.js`
2. Vérifiez que vous avez autorisé le script à envoyer des emails
3. Regardez les logs dans Google Apps Script (View > Logs)

### Les données ne s'enregistrent pas dans le Sheet

1. Vérifiez que `SHEET_ID` est correct dans le script Google Apps Script
2. Vérifiez que le script a les permissions d'accès au Sheet
3. Testez avec la fonction `testScript()` dans Google Apps Script

### Le bouton "Non" ne fuit pas

1. Vérifiez que JavaScript est activé dans votre navigateur
2. Ouvrez la console (F12) pour voir les erreurs éventuelles

### Erreur CORS

C'est normal ! Le mode `no-cors` est utilisé. L'important est que les données arrivent bien dans le Sheet et que l'email soit envoyé.

---

## 📱 Compatibilité

✅ Chrome, Firefox, Safari, Edge (dernières versions)
✅ iOS Safari, Chrome Mobile, Samsung Internet
✅ Tablettes et ordinateurs de bureau
✅ Responsive design pour toutes les tailles d'écran

---

## 🎯 Conseils d'utilisation

1. **Testez d'abord** avec votre propre email
2. **Personnalisez les questions** selon vos préférences
3. **Partagez le lien** avec votre Valentine
4. **Consultez le Google Sheet** pour voir les réponses en temps réel
5. **Vérifiez votre boîte mail** pour le récapitulatif

---

## 📝 Notes importantes

⚠️ **Sécurité** : Les réponses sont stockées dans votre Google Sheet privé
⚠️ **Emails** : Limitez l'utilisation pour éviter le spam (quota Gmail : ~100 emails/jour)
⚠️ **HTTPS** : GitHub Pages utilise HTTPS automatiquement (nécessaire pour les navigateurs modernes)

---

## 💡 Améliorations possibles

- Ajouter plus de questions
- Créer plusieurs thèmes visuels
- Ajouter des images/GIFs
- Créer des branches conditionnelles (questions différentes selon les réponses)
- Ajouter une galerie photo
- Intégrer de la musique de fond

---

## 🎉 Crédits

Créé avec 💖 pour la Saint-Valentin

Design inspiré par l'univers mignon de Hello Kitty et Charlotte aux fraises

---

## 📄 Licence

Libre d'utilisation pour un usage personnel et romantique 💕

---

**Bonne Saint-Valentin ! 💝**
