import { useState } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage, disabled }) {
  const [text, setText] = useState('');
  const maxLength = 1000;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled && text.length <= maxLength) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isOverLimit = text.length > maxLength;

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <div className="message-input-shell">
        <textarea
          className={`message-input ${isOverLimit ? 'over-limit' : ''}`}
          aria-label="Message to CODER"
          placeholder="Paste code, describe an error, or ask a software question..."
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows="2"
          maxLength={maxLength}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!text.trim() || disabled || isOverLimit}
        >
          Send
        </button>
      </div>
      <div className="input-footer">
        <p className="input-hint">Enter sends, Shift + Enter adds a new line.</p>
        <span className={`char-count ${isOverLimit ? 'error-text' : ''}`}>
          {text.length}/{maxLength}
        </span>
      </div>
    </form>
  );
}

export default MessageInput;
