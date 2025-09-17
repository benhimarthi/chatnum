'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]); // Typage explicite ici
  const [input, setInput] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prev => [...prev, 'Message reçu à ' + new Date().toLocaleTimeString()]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages(prev => [...prev, input]);
    setInput('');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Mini Chat Next.js</h1>
      <div style={{ border: '1px solid #ccc', padding: 10, minHeight: 200 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: '5px 0' }}>{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Écrire un message"
        style={{ width: '80%', padding: '8px' }}
      />
      <button onClick={sendMessage} style={{ padding: '8px 16px' }}>
        Envoyer
      </button>
    </div>
  );
}

