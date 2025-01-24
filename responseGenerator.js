import { addMessage } from './main.js';
import { updateContext, getContext } from './contextManager.js';
import { analyzeSentiment } from './sentimentAnalyzer.js';
import { getRandomResponse } from './utils.js';

export function handleUserInput() {
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

function generateBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Update conversation context
    updateContext('lastMessage', userMessage);
    updateContext('sentiment', analyzeSentiment(lowerCaseMessage));

    // Detect user's mood
    if (lowerCaseMessage.includes('sad') || lowerCaseMessage.includes('depressed')) {
        updateContext('mood', 'sad');
    } else if (lowerCaseMessage.includes('angry') || lowerCaseMessage.includes('frustrated')) {
        updateContext('mood', 'angry');
    } else if (lowerCaseMessage.includes('happy') || lowerCaseMessage.includes('excited')) {
        updateContext('mood', 'happy');
    } else if (lowerCaseMessage.includes('anxious') || lowerCaseMessage.includes('stressed')) {
        updateContext('mood', 'anxious');
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
            updateContext('userName', name);
            return `Nice to meet you, ${name}! How can I help you today?`;
        }
    }

    // Handle mood-specific responses
    const mood = getContext('mood');
    if (mood === 'sad') {
        return getRandomResponse([
            'I’m sorry to hear that you’re feeling sad. Would you like to talk about what’s bothering you?',
            'It’s okay to feel sad sometimes. Remember, you’re not alone. How can I support you?',
            'Let’s try to focus on something positive. What’s one thing that made you smile recently?',
        ]);
    } else if (mood === 'angry') {
        return getRandomResponse([
            'I sense that you’re feeling angry. Try taking a few deep breaths. Would you like to talk about it?',
            'Anger is a natural emotion. Let’s work through it together. What’s causing you to feel this way?',
            'It’s okay to feel angry. How about we try a quick grounding exercise? Name 5 things you can see around you.',
        ]);
    } else if (mood === 'happy') {
        return getRandomResponse([
            'That’s great to hear! What’s making you feel happy today?',
            'I’m so glad you’re feeling happy! Let’s celebrate the good moments. 😊',
            'Happiness is contagious! Can you share more about what’s bringing you joy?',
        ]);
    } else if (mood === 'anxious') {
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

    // Handle unknown inputs
    return 'I’m here to listen. Can you tell me more about how you’re feeling?';
}
