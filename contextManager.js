let conversationContext = {
    userName: null,
    lastMessage: null,
    mood: null,
    sentiment: null,
    relationshipStatus: null,
    hobbies: [],
};

// Function to update context
export function updateContext(key, value) {
    conversationContext[key] = value;
}

// Function to get context
export function getContext(key) {
    return conversationContext[key];
}

// Function to reset context
export function resetContext() {
    conversationContext = {
        userName: null,
        lastMessage: null,
        mood: null,
        sentiment: null,
        relationshipStatus: null,
        hobbies: [],
    };
}
