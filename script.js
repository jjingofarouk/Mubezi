// script.js
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to add a message to the chat box
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
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

// Function to generate bot responses
function generateBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return 'Hello! How are you feeling today?';
    } else if (lowerCaseMessage.includes('sad') || lowerCaseMessage.includes('depressed')) {
        return 'I’m sorry to hear that. Remember, it’s okay to feel this way. Let’s try a quick breathing exercise: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds. Repeat 3 times. How does that feel?';
    } else if (lowerCaseMessage.includes('anxious') || lowerCaseMessage.includes('stressed')) {
        return 'Anxiety can be tough. Try this grounding exercise: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. Let me know if it helps!';
    } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
        return 'You’re welcome! Remember, I’m here to support you. 💙';
    } else if (lowerCaseMessage.includes('help')) {
        return 'Here are some resources that might help:<br><br>1. <a class="resource-link" href="https://www.mentalhealth.gov" target="_blank">MentalHealth.gov</a><br>2. <a class="resource-link" href="https://www.crisistextline.org" target="_blank">Crisis Text Line</a><br>3. <a class="resource-link" href="https://www.psychologytoday.com" target="_blank">Psychology Today</a>';
    } else if (lowerCaseMessage.includes('bye')) {
        return 'Goodbye! Take care of yourself. 💙';
    } else {
        return 'I’m here to listen. How are you feeling today?';
    }
}

// Event listeners
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});
