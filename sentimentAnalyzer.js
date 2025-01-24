export function analyzeSentiment(message) {
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
