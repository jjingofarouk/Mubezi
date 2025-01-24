// Import all necessary modules
import { addMessage } from './utils.js'; // Utility functions
import { generateBotResponse } from './responseGenerator.js'; // Bot response logic
import { updateContext, getContext } from './contextManager.js'; // Context management
import { analyzeSentiment } from './sentimentAnalyzer.js'; // Sentiment analysis

// DOM Elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to handle user input
function handleUserInput() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    // Add user's message to the chat box
    addMessage('user', userMessage);

    // Clear the input field
    userInput.value = '';

    // Update context with the user's message
    updateContext('lastMessage', userMessage);
    updateContext('sentiment', analyzeSentiment(userMessage));

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
