import { useState, useCallback } from 'react';
import { sendChatRequest } from '../api/groq';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content) => {
    // 1. Add user message to state
    const userMsg = { role: 'user', content };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    // 2. Call API
    try {
      const botResponseContent = await sendChatRequest(updatedMessages);
      
      const botMsg = { role: 'assistant', content: botResponseContent };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      // 3. Error Handling based on Error Type
      let errorText = "Sorry, I'm having trouble connecting right now. Please try again in a moment.";
      
      if (error.message === 'AUTH_ERROR' || error.message === 'API_KEY_MISSING') {
        errorText = "Support service is temporarily unavailable — please try again later. (Check your API key configuration)";
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: errorText }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return {
    messages,
    isLoading,
    sendMessage
  };
}
