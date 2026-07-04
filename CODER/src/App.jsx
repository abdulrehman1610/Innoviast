import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <p className="app-eyebrow">InnoViast Week 1 Prototype</p>
          <h1>CODER Dev Assistant</h1>
        </div>
        <div className="header-status" aria-label="Assistant scope">
          <span className="status-dot" aria-hidden="true"></span>
          Coding help only
        </div>
      </header>
      <main className="app-main">
        <ChatWindow />
      </main>
    </div>
  );
}

export default App;
