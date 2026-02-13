// =====================================
// CONFIGURATION
// =====================================

// ⚠️ IMPORTANT : Remplacez cette URL par celle de votre Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxweTGHJCBrVSlVvYcMYN-E3QgWTwFQW8H5sVHK4iZ88XTWIICCqCYsU_VLwa_AAVEc/exec';

// Email de destination pour le récapitulatif
const RECIPIENT_EMAIL = 'frost.univers@gmail.com'; // À MODIFIER

// =====================================
// QUESTIONS DU QUIZ
// =====================================

const questions = [
    {
        id: 1,
        text: "Veux-tu être ma Valentine ? 💕",
        answers: [
            { text: "Oui ! 💖", value: "oui", isYes: true },
            { text: "Non 😢", value: "non", isNo: true }
        ],
        isFirstQuestion: true // Question spéciale avec le gag
    },
    {
        id: 2,
        text: "Quel type de journée préfères-tu ?",
        answers: [
            { text: "Chill à la maison avec Netflix 📺", value: "maison" },
            { text: "Sortie à la plage (s'il ne pleut pas) 🏖️", value: "plage" }
        ]
    },
    {
        id: 3,
        text: "Quel repas te ferais le plus plaisir ?",
        answers: [
            { text: "Un bon kébab de Marrakech 🌮", value: "kebab" },
            { text: "Un petit résto à PHO88 🍽️", value: "pho88" }
        ]
    },
    {
        id: 4,
        text: "Quel cadeau te ferait le plus plaisir ?",
        answers: [
            { text: "Une belle rose 🌹", value: "rose" },
            { text: "Des bons petits chocolats 🍫", value: "chocolats" }
        ]
    },
    {
        id: 5,
        text: "Quel dresscode aimerais-tu ?",
        answers: [
            { text: "Style décontracté, pas de prise de tête 🧦", value: "décontracté" },
            { text: "Style élégant, essayer de plaire à l'autre 👗", value: "élégant" }
        ]
    },
    {
        id: 6,
        text: "Quelle activité on fera demain ?",
        answers: [
            { text: "Musculation 🏋️", value: "musuc" },
            { text: "Activité manuel 🎨", value: "manuel" }
        ]
    },
    {
        id: 7,
        text: "Avec quelle musique aimerais-tu que je te récupère ?",
        type: "open",  // ← Active la zone de texte
        placeholder: "Écris ta réponse ici... 💖"
    },
    {
        id: 8,
        text: "A quelle heure aimerais-tu que je vienne te chercher ?",
        answers: [
            { text: "Tôt dans la matinée (8h)", value: "8h" },
            { text: "Fin de matinée (11h)", value: "11h" }
        ]
    },
    {
        id: 9,
        text: "A quelle heure aimerais-tu que je te dépose chez toi ?",
        answers: [
            { text: "Tôt dans l'après-midi (14h)", value: "14h" },
            { text: "Fin de l'après-midi (17h)", value: "17h" }
        ]
    },
        {
        id: 10,
        text: "Des suggestions à me proposer ?",
        type: "open",  // ← Active la zone de texte
        placeholder: "Écris ta réponse ici... 💖"
    }
];

// =====================================
// VARIABLES GLOBALES
// =====================================

let currentQuestionIndex = 0;
let userAnswers = [];
let sessionId = generateSessionId();
let noButtonMoveCount = 0; // Compteur de tentatives de clic sur "Non"

// =====================================
// ÉLÉMENTS DOM
// =====================================

const welcomeScreen = document.getElementById('welcomeScreen');
const questionScreen = document.getElementById('questionScreen');
const endScreen = document.getElementById('endScreen');
const startBtn = document.getElementById('startBtn');
const questionNumber = document.getElementById('questionNumber');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const progressFill = document.getElementById('progressFill');
const loading = document.getElementById('loading');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

// =====================================
// FONCTIONS UTILITAIRES
// =====================================

/**
 * Génère un ID de session unique
 */
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Formate la date/heure actuelle
 */
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// =====================================
// GESTION DU QUIZ
// =====================================

/**
 * Démarre le quiz
 */
function startQuiz() {
    welcomeScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    showQuestion();
}

/**
 * Affiche la question actuelle
 */
function showQuestion() {
    const question = questions[currentQuestionIndex];
    
    // Mise à jour du numéro de question
    questionNumber.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    
    // Mise à jour de la barre de progression
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Affichage du texte de la question
    questionText.textContent = question.text;
    
    // Génération des réponses selon le type de question
    answersContainer.innerHTML = '';
    
    // === QUESTION OUVERTE (TEXTAREA) ===
    if (question.type === 'open') {
        createOpenQuestion(question);
    } 
    // === QUESTION À CHOIX MULTIPLES ===
    else {
        createMultipleChoiceQuestion(question);
    }
}

/**
 * Crée une question à réponse ouverte (textarea)
 */
function createOpenQuestion(question) {
    // Conteneur pour la zone de texte et le bouton
    const openContainer = document.createElement('div');
    openContainer.className = 'open-answer-container';
    
    // Zone de texte (textarea)
    const textarea = document.createElement('textarea');
    textarea.className = 'open-answer-textarea';
    textarea.placeholder = question.placeholder || 'Écris ta réponse ici...';
    textarea.rows = 5;
    textarea.id = 'openAnswerTextarea';
    
    // Compteur de caractères
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.textContent = '0 caractères';
    
    // Mettre à jour le compteur à chaque frappe
    textarea.addEventListener('input', () => {
        const length = textarea.value.length;
        charCounter.textContent = `${length} caractère${length > 1 ? 's' : ''}`;
    });
    
    // Bouton de validation
    const submitBtn = document.createElement('button');
    submitBtn.className = 'answer-btn submit-open-answer';
    submitBtn.textContent = 'Valider ma réponse 💝';
    submitBtn.disabled = true; // Désactivé par défaut
    
    // Activer le bouton seulement si du texte est saisi
    textarea.addEventListener('input', () => {
        submitBtn.disabled = textarea.value.trim().length === 0;
        
        // Ajouter une classe si le bouton est actif
        if (textarea.value.trim().length > 0) {
            submitBtn.classList.add('active');
        } else {
            submitBtn.classList.remove('active');
        }
    });
    
    // Gérer la soumission
    submitBtn.addEventListener('click', () => {
        const answer = textarea.value.trim();
        if (answer) {
            selectAnswer(question, {
                text: answer,
                value: answer
            });
        }
    });
    
    // Permettre de valider avec Ctrl+Enter ou Cmd+Enter
    textarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (textarea.value.trim().length > 0) {
                submitBtn.click();
            }
        }
    });
    
    // Assembler le tout
    openContainer.appendChild(textarea);
    openContainer.appendChild(charCounter);
    openContainer.appendChild(submitBtn);
    answersContainer.appendChild(openContainer);
    
    // Focus automatique sur le textarea
    setTimeout(() => textarea.focus(), 100);
}

/**
 * Crée une question à choix multiples (boutons)
 */
function createMultipleChoiceQuestion(question) {
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        
        // Pour la première question : gestion spéciale du gag
        if (question.isFirstQuestion) {
            if (answer.isYes) {
                button.classList.add('yes-btn');
                button.addEventListener('click', () => handleYesAnswer(question, answer));
            } else if (answer.isNo) {
                button.classList.add('no-btn');
                setupRunawayButton(button, question, answer);
            }
        } else {
            // Questions normales
            button.addEventListener('click', () => selectAnswer(question, answer));
        }
        
        answersContainer.appendChild(button);
    });
}

/**
 * Gestion du bouton "Oui" pour la première question
 */
function handleYesAnswer(question, answer) {
    // Animation de grossissement
    const yesBtn = document.querySelector('.yes-btn');
    yesBtn.classList.add('grow');
    
    // Enregistrer et passer à la suite après l'animation
    setTimeout(() => {
        selectAnswer(question, answer);
    }, 300);
}

/**
 * Configuration du bouton "Non" fuyant
 */
function setupRunawayButton(button, question, answer) {
    const container = answersContainer;
    const yesBtn = document.querySelector('.yes-btn');
    
    // Événement au survol (desktop)
    button.addEventListener('mouseenter', (e) => {
        moveNoButton(button, container);
        growYesButton(yesBtn);
    });
    
    // Événement tactile (mobile)
    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        moveNoButton(button, container);
        growYesButton(yesBtn);
    });
    
    // Empêcher le clic (sécurité supplémentaire)
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveNoButton(button, container);
        growYesButton(yesBtn);
    });
}

/**
 * Déplace le bouton "Non" à une position aléatoire
 */
function moveNoButton(button, container) {
    noButtonMoveCount++;
    
    // Obtenir les dimensions du conteneur
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    // Calculer une nouvelle position aléatoire
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Appliquer la nouvelle position
    button.style.position = 'absolute';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    
    // Assurer que le conteneur est en position relative
    container.style.position = 'relative';
    container.style.minHeight = '200px';
}

/**
 * Fait grossir progressivement le bouton "Oui"
 */
function growYesButton(yesBtn) {
    if (!yesBtn) return;
    
    // Calculer le facteur de grossissement basé sur le nombre de tentatives
    const scaleFactor = 1 + (noButtonMoveCount * 0.1);
    yesBtn.style.transform = `scale(${Math.min(scaleFactor, 1.5)})`; // Max 1.5x
}

/**
 * Gère la sélection d'une réponse
 */
function selectAnswer(question, answer) {
    // Enregistrer la réponse
    userAnswers.push({
        questionId: question.id,
        questionText: question.text,
        answerText: answer.text,
        answerValue: answer.value
    });
    
    // Passer à la question suivante ou terminer
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        // Question suivante
        setTimeout(() => {
            showQuestion();
        }, 300);
    } else {
        // Fin du quiz
        setTimeout(() => {
            endQuiz();
        }, 300);
    }
}

/**
 * Termine le quiz et envoie les données
 */
function endQuiz() {
    questionScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    
    // Envoyer les données au Google Apps Script
    sendDataToGoogleSheet();
}

// =====================================
// ENVOI DES DONNÉES À GOOGLE SHEET
// =====================================

/**
 * Prépare et envoie les données au Google Apps Script
 */
async function sendDataToGoogleSheet() {
    try {
        // Préparer les données à envoyer
        const data = {
            sessionId: sessionId,
            timestamp: getCurrentDateTime(),
            email: RECIPIENT_EMAIL,
            answers: userAnswers
        };
        
        // Afficher le loading
        loading.classList.remove('hidden');
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        // Envoyer les données via POST
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important pour Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        // Note : avec mode 'no-cors', on ne peut pas lire la réponse
        // On considère que l'envoi est réussi si pas d'erreur
        setTimeout(() => {
            loading.classList.add('hidden');
            successMessage.classList.remove('hidden');
        }, 2000);
        
    } catch (error) {
        console.error('Erreur lors de l\'envoi:', error);
        loading.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorText.textContent = error.message;
    }
}

// =====================================
// INITIALISATION
// =====================================

/**
 * Initialise l'application au chargement de la page
 */
document.addEventListener('DOMContentLoaded', () => {
    // Bouton de démarrage
    startBtn.addEventListener('click', startQuiz);
    
    console.log('🌸 Quiz de Saint-Valentin initialisé');
    console.log('Session ID:', sessionId);
});
