import { SYSTEM_PROMPT } from '../prompts/systemPrompt';

export const sendChatRequest = async (messages) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'openai/gpt-4o-mini';

  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('API_KEY_MISSING');
  }

  // Format messages for OpenRouter (prepend system prompt)
  const formattedMessages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages
  ];

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
    // We throw typed/custom errors for the hook to catch and display user-friendly messages
    if (error.message === 'AUTH_ERROR' || error.message === 'API_KEY_MISSING') {
      throw error;
    }
    throw new Error('NETWORK_ERROR', { cause: error });
  }
};
