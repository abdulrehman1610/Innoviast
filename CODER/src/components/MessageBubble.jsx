import './MessageBubble.css';

function renderContent(content) {
  const parts = content.split(/```([\s\S]*?)```/g);

  return parts.map((part, index) => {
    const isCodeBlock = index % 2 === 1;

    if (isCodeBlock) {
      const trimmed = part.replace(/^\w+\n/, '').trim();
      return (
        <pre className="message-code" key={index}>
          <code>{trimmed}</code>
        </pre>
      );
    }

    return part
      .split(/\n{2,}/)
      .filter(Boolean)
      .map((paragraph, paragraphIndex) => (
        <p className="message-content" key={`${index}-${paragraphIndex}`}>
          {paragraph}
        </p>
      ));
  });
}

function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  
  return (
    <div className={`message-wrapper ${isUser ? 'user-wrapper' : 'bot-wrapper'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        {renderContent(content)}
      </div>
    </div>
  );
}

export default MessageBubble;
