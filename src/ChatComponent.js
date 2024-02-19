// src/ChatComponent.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ControlButtons from './ControlButtons';
import styles from './App.module.css';
import { UserContext } from './UserContext'; // Assuming this context provides user and API key details

const ChatComponent = ({ apiKey: propsApiKey }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [responseTime, setResponseTime] = useState(null);

  // useContext to access username and fallback for username setup
  const userContext = useContext(UserContext);
  const username = userContext?.user?.username || "Anonymous"; // Fallback to "Anonymous" if username not found in context

  // Default API key setup; use .env for security and flexibility
  const defaultApiKey = process.env.REACT_APP_DEFAULT_API_KEY || "your_default_api_key_here"; // Placeholder for your default API key
  const useApiKey = propsApiKey || userContext?.userApiKey || defaultApiKey;

  // Select model based on the API key used
  const modelVersion = useApiKey === defaultApiKey ? "gpt-3.5-turbo" : "gpt-4";

  const openai = axios.create({
    baseURL: 'https://api.openai.com/v1/',
    headers: { 'Authorization': `Bearer ${useApiKey}` }
  });

  useEffect(() => {
    let interval;
    if (isTiming) {
      interval = setInterval(() => setTimer(prevTimer => prevTimer + 1), 1000);
    } else if (!isTiming && timer !== 0) {
      clearInterval(interval);
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isTiming, timer]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addMessage = (role, content) => {
    const timestamp = new Date().toISOString();
    const formattedMessage = `${username} ${timestamp}:\n${content}`;
    setMessages(msgs => [...msgs, { role, content: formattedMessage }]);
  };

  const sendMessage = async () => {
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    addMessage('user', userMessage);
    setInputValue('');
    setIsTiming(true); // Start timing response

    try {
      const response = await openai.post('chat/completions', {
        model: modelVersion,
        prompt: userMessage,
        max_tokens: 150,
      });
      addMessage('assistant', response.data.choices[0].text);
    } catch (error) {
      console.error('Error fetching chat completion:', error);
    } finally {
      setIsTiming(false); // Stop timing irrespective of request success or failure
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
          <li key={index} className={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}>
            {msg.content.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < msg.content.split('\n').length - 1 && <br />}
              </React.Fragment>
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
          <ControlButtons sendMessage={sendMessage} clearConversation={() => setMessages([])} />
          {isTiming && <div>Timing response...</div>}
          {responseTime && <div>Response time: {responseTime} seconds</div>}
        </form>
      </footer>
    </div>
  );
};

export default ChatComponent;
