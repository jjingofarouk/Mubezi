// Function to get a random response from an array
export function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}
