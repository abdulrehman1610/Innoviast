import { SYSTEM_PROMPT } from '../prompts/systemPrompt';

export const sendChatRequest = async (messages) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  // Use llama-3.1-8b-instant or similar as default for Groq
  const model = import.meta.env.VITE_GROQ_MODEL || 'llama-3.1-8b-instant';

  if (!apiKey || apiKey.includes('your_api_key_here') || apiKey.includes('your_groq_api_key_here')) {
    throw new Error('API_KEY_MISSING');
  }

  // Format messages (prepend system prompt)
  const formattedMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages
  ];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: formattedMessages,
        max_tokens: 400,
        temperature: 0.4
      }),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('AUTH_ERROR');
      }
      throw new Error(`API_ERROR: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('INVALID_RESPONSE');
    }

    return data.choices[0].message.content;
  } catch (error) {
    if (error.message === 'AUTH_ERROR' || error.message === 'API_KEY_MISSING') {
      throw error;
    }
    throw new Error('NETWORK_ERROR', { cause: error });
  }
};
