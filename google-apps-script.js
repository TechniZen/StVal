/**
 * =====================================
 * GOOGLE APPS SCRIPT - QUIZ SAINT-VALENTIN
 * =====================================
 * 
 * Ce script doit être déployé comme Web App dans Google Apps Script
 * 
 * INSTRUCTIONS DE DÉPLOIEMENT :
 * 1. Ouvrez Google Apps Script : script.google.com
 * 2. Créez un nouveau projet
 * 3. Collez ce code
 * 4. Liez-le à un Google Sheet (voir instructions ci-dessous)
 * 5. Déployez comme Web App :
 *    - Cliquez sur "Déployer" > "Nouveau déploiement"
 *    - Type : Application Web
 *    - Exécuter en tant que : Moi
 *    - Qui peut y accéder : Tout le monde
 * 6. Copiez l'URL du déploiement dans script.js
 */

// =====================================
// CONFIGURATION
// =====================================

// ID de votre Google Sheet (à récupérer dans l'URL du Sheet)
// URL format: https://docs.google.com/spreadsheets/d/VOTRE_SHEET_ID/edit
const SHEET_ID = '1GixIbsTOXnTkS5V7pobzpvn0fspiT2IQigO04Ku-Zd4'; // À MODIFIER

// Nom de l'onglet où stocker les données
const SHEET_NAME = 'Réponses';

// Email de l'expéditeur (votre email Gmail)
const SENDER_EMAIL = 'frost.univers@gmail.com'; // À MODIFIER

// =====================================
// FONCTION PRINCIPALE - RÉCEPTION POST
// =====================================

/**
 * Fonction appelée quand le site envoie les données
 */
function doPost(e) {
  try {
    // Récupérer les données envoyées
    const data = JSON.parse(e.postData.contents);
    
    Logger.log('Données reçues:', data);
    
    // 1. Enregistrer dans Google Sheet
    saveToSheet(data);
    
    // 2. Envoyer l'email récapitulatif
    sendRecapEmail(data);
    
    // Retourner une réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Erreur:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// =====================================
// ENREGISTREMENT DANS GOOGLE SHEET
// =====================================

/**
 * Enregistre les données dans le Google Sheet
 */
function saveToSheet(data) {
  try {
    // Ouvrir le Google Sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Créer l'onglet s'il n'existe pas
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      
      // Créer les en-têtes
      const headers = [
        'Horodatage',
        'Session ID',
        'Email',
        'Question 1',
        'Réponse 1',
        'Question 2',
        'Réponse 2',
        'Question 3',
        'Réponse 3',
        'Question 4',
        'Réponse 4',
        'Question 5',
        'Réponse 5'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Formater les en-têtes
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#FFB3C6')
        .setFontWeight('bold')
        .setFontColor('#FFFFFF');
    }
    
    // Préparer la ligne de données
    const row = [
      data.timestamp,
      data.sessionId,
      data.email
    ];
    
    // Ajouter chaque question et réponse
    data.answers.forEach(answer => {
      row.push(answer.questionText);
      row.push(answer.answerText);
    });
    
    // Ajouter la ligne au sheet
    sheet.appendRow(row);
    
    // Formater la nouvelle ligne
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, row.length)
      .setBorder(true, true, true, true, false, false)
      .setVerticalAlignment('middle');
    
    // Alterner les couleurs de fond
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, row.length).setBackground('#FFF5F7');
    }
    
    Logger.log('Données enregistrées avec succès dans le Sheet');
    
  } catch (error) {
    Logger.log('Erreur lors de l\'enregistrement:', error);
    throw error;
  }
}

// =====================================
// ENVOI DE L'EMAIL RÉCAPITULATIF
// =====================================

/**
 * Envoie un email récapitulatif avec toutes les réponses
 */
function sendRecapEmail(data) {
  try {
    // Créer le sujet de l'email
    const subject = '💝 Récapitulatif de ton Quiz de Saint-Valentin';
    
    // Créer le corps de l'email en HTML
    const htmlBody = createEmailHTML(data);
    
    // Envoyer l'email
    MailApp.sendEmail({
      to: data.email,
      subject: subject,
      htmlBody: htmlBody
    });
    
    Logger.log('Email envoyé avec succès à:', data.email);
    
  } catch (error) {
    Logger.log('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
}

/**
 * Crée le contenu HTML de l'email
 */
function createEmailHTML(data) {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #FFE5EC 0%, #E8D5F2 100%);
          padding: 20px;
          margin: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 8px 24px rgba(255, 105, 180, 0.2);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .title {
          color: #FB6F92;
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #FF8FAB;
          font-size: 1rem;
        }
        .info-box {
          background: #FFF5F7;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 30px;
          border-left: 4px solid #FFB3C6;
        }
        .info-label {
          color: #FF8FAB;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 5px;
        }
        .info-value {
          color: #FB6F92;
          font-size: 1rem;
        }
        .question-block {
          margin-bottom: 25px;
          padding: 20px;
          background: #FFFBFC;
          border-radius: 15px;
          border: 2px solid #FFE5EC;
        }
        .question {
          color: #FB6F92;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .answer {
          color: #FF8FAB;
          font-size: 1rem;
          padding: 10px 15px;
          background: white;
          border-radius: 8px;
          border-left: 3px solid #FFB3C6;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #FFE5EC;
          color: #FF8FAB;
          font-size: 0.9rem;
        }
        .hearts {
          font-size: 1.5rem;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">💝 Récapitulatif de ton Quiz</h1>
          <p class="subtitle">Voici toutes tes réponses avec amour !</p>
        </div>
        
        <div class="info-box">
          <div class="info-label">📅 Date et heure</div>
          <div class="info-value">${data.timestamp}</div>
        </div>
        
        <div class="info-box">
          <div class="info-label">🆔 Session ID</div>
          <div class="info-value">${data.sessionId}</div>
        </div>
  `;
  
  // Ajouter chaque question et réponse
  data.answers.forEach((answer, index) => {
    html += `
        <div class="question-block">
          <div class="question">Question ${index + 1} : ${answer.questionText}</div>
          <div class="answer">✨ ${answer.answerText}</div>
        </div>
    `;
  });
  
  // Ajouter le footer
  html += `
        <div class="hearts">💕 💖 💗 💝 💕</div>
        
        <div class="footer">
          <p>Merci d'avoir participé à ce quiz de Saint-Valentin !</p>
          <p>Avec tout mon amour 💖</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return html;
}

// =====================================
// FONCTION DE TEST (OPTIONNELLE)
// =====================================

/**
 * Fonction pour tester le script manuellement
 * Exécutez cette fonction pour vérifier que tout fonctionne
 */
function testScript() {
  const testData = {
    sessionId: 'session_test_' + Date.now(),
    timestamp: new Date().toLocaleString('fr-FR'),
    email: 'test@example.com',
    answers: [
      {
        questionId: 1,
        questionText: 'Veux-tu être ma Valentine ? 💕',
        answerText: 'Oui ! 💖',
        answerValue: 'oui'
      },
      {
        questionId: 2,
        questionText: 'Quel type de rendez-vous préfères-tu ?',
        answerText: 'Dîner romantique aux chandelles 🕯️',
        answerValue: 'diner_romantique'
      }
    ]
  };
  
  try {
    saveToSheet(testData);
    sendRecapEmail(testData);
    Logger.log('Test réussi !');
  } catch (error) {
    Logger.log('Erreur durant le test:', error);
  }
}
