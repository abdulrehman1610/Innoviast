import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '../hooks/useChat';
import './ChatWindow.css';

function ChatWindow() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="chat-window">
      <MessageList
        messages={messages}
        isLoading={isLoading}
        onStarterClick={sendMessage}
      />
      <MessageInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
}

export default ChatWindow;
