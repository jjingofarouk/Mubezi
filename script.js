// DOM Elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Store conversation context
let conversationContext = {
    userName: null,
    lastMessage: null,
    mood: null,
    sentiment: null,
    relationshipStatus: null,
    hobbies: [],
};

// Function to add a message to the chat box
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Function to analyze sentiment
function analyzeSentiment(message) {
    const positiveWords = ['happy', 'joy', 'excited', 'love', 'great', 'amazing', 'good', 'wonderful'];
    const negativeWords = ['sad', 'angry', 'depressed', 'frustrated', 'anxious', 'stressed', 'bad', 'hurt'];

    let positiveCount = 0;
    let negativeCount = 0;

    positiveWords.forEach(word => {
        if (message.includes(word)) positiveCount++;
    });

    negativeWords.forEach(word => {
        if (message.includes(word)) negativeCount++;
    });

    if (positiveCount > negativeCount) {
        return 'positive';
    } else if (negativeCount > positiveCount) {
        return 'negative';
    } else {
        return 'neutral';
    }
}

// Function to get a random response from an array
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Function to generate bot responses
function generateBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Update conversation context
    conversationContext.lastMessage = userMessage;
    conversationContext.sentiment = analyzeSentiment(lowerCaseMessage);

    // Detect user's mood
    if (lowerCaseMessage.includes('sad') || lowerCaseMessage.includes('depressed')) {
        conversationContext.mood = 'sad';
    } else if (lowerCaseMessage.includes('angry') || lowerCaseMessage.includes('frustrated')) {
        conversationContext.mood = 'angry';
    } else if (lowerCaseMessage.includes('happy') || lowerCaseMessage.includes('excited')) {
        conversationContext.mood = 'happy';
    } else if (lowerCaseMessage.includes('anxious') || lowerCaseMessage.includes('stressed')) {
        conversationContext.mood = 'anxious';
    }

    // Handle greetings
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return getRandomResponse(['Hello!', 'Hi there!', 'Hey!']) + ' How are you feeling today?';
    }

    // Handle name-related queries
    if (lowerCaseMessage.includes('name')) {
        if (lowerCaseMessage.includes('your')) {
            return 'I’m your mental health assistant. You can call me ChatBot. 😊';
        } else if (lowerCaseMessage.includes('my')) {
            const name = userMessage.split(' ').pop();
            conversationContext.userName = name;
            return `Nice to meet you, ${name}! How can I help you today?`;
        }
    }

    // Handle mood-specific responses
    if (conversationContext.mood === 'sad') {
        return getRandomResponse([
            'I’m sorry to hear that you’re feeling sad. Would you like to talk about what’s bothering you?',
            'It’s okay to feel sad sometimes. Remember, you’re not alone. How can I support you?',
            'Let’s try to focus on something positive. What’s one thing that made you smile recently?',
        ]);
    } else if (conversationContext.mood === 'angry') {
        return getRandomResponse([
            'I sense that you’re feeling angry. Try taking a few deep breaths. Would you like to talk about it?',
            'Anger is a natural emotion. Let’s work through it together. What’s causing you to feel this way?',
            'It’s okay to feel angry. How about we try a quick grounding exercise? Name 5 things you can see around you.',
        ]);
    } else if (conversationContext.mood === 'happy') {
        return getRandomResponse([
            'That’s great to hear! What’s making you feel happy today?',
            'I’m so glad you’re feeling happy! Let’s celebrate the good moments. 😊',
            'Happiness is contagious! Can you share more about what’s bringing you joy?',
        ]);
    } else if (conversationContext.mood === 'anxious') {
        return getRandomResponse([
            'Anxiety can be tough. Try this grounding exercise: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.',
            'I’m here to help you through this anxiety. Let’s focus on your breathing. Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds. Repeat 3 times.',
            'It’s okay to feel anxious. Let’s talk about what’s on your mind. How can I support you?',
        ]);
    }

    // Handle gratitude
    if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
        return getRandomResponse([
            'You’re welcome! Remember, I’m here to support you. 💙',
            'No problem at all! Let me know if there’s anything else I can do for you.',
            'Anytime! How are you feeling now?',
        ]);
    }

    // Handle help requests
    if (lowerCaseMessage.includes('help')) {
        return 'Here are some resources that might help:<br><br>1. <a class="resource-link" href="https://www.mentalhealth.gov" target="_blank">MentalHealth.gov</a><br>2. <a class="resource-link" href="https://www.crisistextline.org" target="_blank">Crisis Text Line</a><br>3. <a class="resource-link" href="https://www.psychologytoday.com" target="_blank">Psychology Today</a>';
    }

    // Handle goodbye
    if (lowerCaseMessage.includes('bye')) {
        return 'Goodbye! Take care of yourself. 💙';
    }

    // Handle relationship-related queries
    if (lowerCaseMessage.includes('relationship') || lowerCaseMessage.includes('partner')) {
        if (lowerCaseMessage.includes('how')) {
            return 'Relationships can be challenging. How are things going with your partner?';
        } else if (lowerCaseMessage.includes('problem')) {
            return 'It’s normal to have problems in a relationship. Would you like to talk about what’s bothering you?';
        } else {
            return 'Relationships are important. How can I support you in this area?';
        }
    }

    // Handle hobbies and interests
    if (lowerCaseMessage.includes('hobby') || lowerCaseMessage.includes('interest')) {
        if (conversationContext.hobbies.length === 0) {
            return 'What are some of your hobbies or interests?';
        } else {
            return `You mentioned you like ${conversationContext.hobbies.join(', ')}. How are those going?`;
        }
    }

    // Handle unknown inputs
    return 'I’m here to listen. Can you tell me more about how you’re feeling?';
}

// Function to handle user input
function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    // Add user's message to the chat box
    addMessage('user', userMessage);

    // Clear the input field
    userInput.value = '';

    // Generate bot response
    const botResponse = generateBotResponse(userMessage);

    // Simulate a delay before the bot responds
    setTimeout(() => {
        addMessage('bot', botResponse);
    }, 500);
}

// Event listeners
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Initial greeting from the bot
window.onload = () => {
    setTimeout(() => {
        addMessage('bot', 'Hello! 👋 How can I help you today?');
    }, 500);
};
