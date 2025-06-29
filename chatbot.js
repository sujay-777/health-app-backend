const intents = {
  greeting: {
    patterns: ['hi', 'hello', 'hey', 'howdy', 'greetings'],
    responses: [
      'Hello! How can I help you today?',
      'Hi there! How are you feeling?',
      'Welcome! I\'m here to listen and support you.'
    ]
  },
  anxiety: {
    patterns: ['anxious', 'anxiety', 'worried', 'nervous', 'panic'],
    responses: [
      'I understand you\'re feeling anxious. Would you like to try a quick breathing exercise?',
      'It\'s okay to feel anxious. Let\'s take a moment to breathe together.',
      'Would you like to talk about what\'s making you feel anxious?'
    ]
  },
  stress: {
    patterns: ['stressed', 'stress', 'overwhelmed', 'pressure', 'tension'],
    responses: [
      'Stress can be challenging. Would you like to try a quick stress-relief technique?',
      'Let\'s take a moment to identify what\'s causing your stress.',
      'Remember to take deep breaths. Would you like to try a guided relaxation exercise?'
    ]
  },
  depression: {
    patterns: ['depressed', 'sad', 'down', 'hopeless', 'empty'],
    responses: [
      'I\'m here to listen and support you. Would you like to talk about what you\'re feeling?',
      'It\'s important to acknowledge these feelings. Would you like to speak with a therapist?',
      'Remember that you\'re not alone. Would you like to try some coping strategies?'
    ]
  },
  sleep: {
    patterns: ['can\'t sleep', 'insomnia', 'tired', 'exhausted', 'sleep problems'],
    responses: [
      'Sleep issues can be challenging. Would you like to try some sleep hygiene tips?',
      'Let\'s explore what might be affecting your sleep.',
      'Would you like to try a guided relaxation exercise before bed?'
    ]
  }
};

class Chatbot {
  constructor() {
    this.intents = intents;
  }

  // Simple pattern matching using includes
  findIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [intent, data] of Object.entries(this.intents)) {
      if (data.patterns.some(pattern => lowerMessage.includes(pattern))) {
        return intent;
      }
    }
    
    return 'general';
  }

  // Get a random response for the given intent
  getResponse(intent) {
    if (this.intents[intent]) {
      const responses = this.intents[intent].responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    return "I'm here to listen. Would you like to tell me more about how you're feeling?";
  }

  // Process a message and return a response
  processMessage(message) {
    const intent = this.findIntent(message);
    const response = this.getResponse(intent);
    
    return {
      intent,
      response,
      requiresEscalation: this.shouldEscalate(intent, message)
    };
  }

  // Determine if the message should be escalated to a therapist
  shouldEscalate(intent, message) {
    const urgentKeywords = ['suicide', 'kill', 'die', 'end it all', 'no reason to live'];
    const lowerMessage = message.toLowerCase();
    
    return urgentKeywords.some(keyword => lowerMessage.includes(keyword));
  }
}

module.exports = Chatbot; 