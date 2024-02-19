// src/ChatComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ControlButtons from './ControlButtons';
import styles from './App.module.css';
import { useUser } from './UserContext'; // Using a hook to access user details

const ChatComponent = ({ apiKey }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [responseTime, setResponseTime] = useState(null);

  // Use the useUser hook to retrieve user details, including apiKey and username
  const { userApiKey, user } = useUser();
  const username = user?.username || 'Anonymous'; // Providing a default username if none is found

  // Default API key and model configuration
  const defaultApiKey = process.env.REACT_APP_OPENAI_API_KEY || 'YOUR_DEFAULT_API_KEY'; // Ensure you have a fallback key
  const defaultModel = 'gpt-3.5-turbo';
  const upgradedModel = 'gpt-4-0125-preview';

  const modelToUse = apiKey || userApiKey ? upgradedModel : defaultModel; // Decide on model based on the presence of any API key

  const openai = axios.create({
    baseURL: 'https://api.openai.com/v1/',
    headers: {
      'Authorization': `Bearer ${apiKey || userApiKey || defaultApiKey}` // First priority to the specific apiKey prop, then userApiKey, and lastly the default
    }
  });

  useEffect(() => {
    let interval;
    if (isTiming) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    } else {
      clearInterval(interval);
      setTimer(0);
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isTiming]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addMessage = (role, content) => {
    const timestamp = new Date().toLocaleString('en-US', { hour12: false });
    const formattedMessage = `${username} ${timestamp}: ${content}`;
    setMessages((msgs) => [...msgs, { role, content: formattedMessage }]);
  };

  const sendMessage = async () => {
    setIsTiming(false);
    setResponseTime(null);
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    addMessage('user', userMessage);
    setInputValue('');
    setIsTiming(true);

    try {
      const startTime = Date.now();
      const response = await openai.post('chat/completions', {
        model: modelToUse,
        messages: messages.map((msg) => ({ role: msg.role, content: msg.content })),
      });
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;

      setResponseTime(duration);
      setIsTiming(false);

      const assistantMessage = response.data.choices[0].message.content;
      if (assistantMessage) {
        addMessage('assistant', assistantMessage);
      }
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      setIsTiming(false);
    }
  };

  const copyLastResponse = () => {
    const lastMessage = messages.find(msg => msg.role === 'assistant');
    if (lastMessage && navigator.clipboard) {
      navigator.clipboard.writeText(lastMessage.content);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setTimer(0); // Reset timer
    setIsTiming(false); // Ensure timing is stopped
    setResponseTime(null); // Reset response time
  };

  return (
    <div className={styles.chatComponent}>
      <ul className={styles.messageList}>
        {messages.map((msg, index) => (
          <li key={index} className={msg.role === 'user' ? styles.user : styles.assistant}>
            {msg.content.split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i < msg.content.split('\n').length - 1 && <br />}</React.Fragment>
            ))}
          </li>
        ))}
      </ul>
      <footer className={styles.chatFooter}>
        <form className={styles.messageForm} onSubmit={(e) => e.preventDefault()}>
          <textarea
            className={styles.messageInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here and press SHIFT+ENTER to send..."
            autoFocus
            rows={2}
          />
          <div className="button-container" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: '7px 0' }}>
            <button type="button" className={styles.sendButton} onClick={sendMessage} style={{ margin: '7px' }}>Send</button>
            <ControlButtons copyLastResponse={copyLastResponse} clearConversation={clearConversation} />
            {isTiming && <p className={styles.timer} style={{ marginLeft: '7px', marginBottom: '2px', color: 'black' }}>Response Time: {timer} seconds</p>}
            {responseTime !== null && <p className={styles.responseTime} style={{ marginLeft: '7px', marginBottom: '2px', color: 'black' }}>Response Time: {responseTime} seconds</p>}
          </div>
        </form>
      </footer>
    </div>
  );
};

export default ChatComponent;
