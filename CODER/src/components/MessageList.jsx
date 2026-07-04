import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import './MessageList.css';

const starterPrompts = [
  'Review this JavaScript function for bugs.',
  'Explain this error message in simple terms.',
  'Help me plan a clean React component structure.',
];

function MessageList({ messages, isLoading, onStarterClick }) {
  const bottomRef = useRef(null);

  // Auto-scroll to the bottom when messages change or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-copy">
            <p className="empty-kicker">Ready for focused coding help</p>
            <h2>What are we building or debugging today?</h2>
            <p>
              Ask about code, stack traces, architecture, refactoring, or a technical concept.
            </p>
          </div>
          <div className="starter-grid" aria-label="Starter prompts">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="starter-button"
                onClick={() => onStarterClick(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} content={msg.content} />
        ))
      )}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
