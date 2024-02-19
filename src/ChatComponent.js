// src/ChatComponent.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ControlButtons from './ControlButtons';
import styles from './App.module.css';
import { UserContext } from './UserContext'; // Ensuring we can use the user details

const ChatComponent = ({ apiKey }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [responseTime, setResponseTime] = useState(null);
  const { userApiKey } = useContext(UserContext); // Use userApiKey and possibly other user details for USERNAME
  const username = "DJChilly"; // Assuming a static username for demonstration; you might want to dynamically fetch this

  // Use environment variable for default API key
  const defaultApiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const defaultModel = "gpt-3.5-turbo";
  const upgradedModel = "gpt-4-0125-preview";

  const openai = axios.create({
    baseURL: 'https://api.openai.com/v1/',
    headers: {
      // Use provided API key or default if none is provided
      'Authorization': `Bearer ${apiKey || defaultApiKey}`
    }
  });

  useEffect(() => {
    let interval;
    if (isTiming) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(0); // Reset timer
    }

    return () => clearInterval(interval);
  }, [isTiming]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid a new line being created by the textarea
      sendMessage(); // Call the send message function
    }
  };

  const addMessage = (role, content) => {
    const timestamp = new Date().toLocaleString('en-US', { hour12: false });
    const formattedMessage = `${username} ${timestamp}:\n${content}`;
    setMessages(msgs => [...msgs, { role, content: formattedMessage }]);
  };

  // Update sendMessage considering models based on apiKey presence
  const sendMessage = async () => {
    setIsTiming(false); // Stop the timer if it was running
    setResponseTime(null); // Reset response time for new message
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    addMessage('user', userMessage);
    setInputValue('');
    setIsTiming(true); // Start timing

    // Determine which model to use based on apiKey presence
    const modelToUse = apiKey ? upgradedModel : defaultModel;

    try {
      const startTime = Date.now();
      const response = await openai.post('chat/completions', {
        model: modelToUse, // Use selected model
        messages: messages.map(msg => ({ role: msg.role, content: msg.content })),
      });
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000; // Calculate duration in seconds

      setResponseTime(duration); // Set response time
      setIsTiming(false); // Stop timing

      const assistantMessage = response.data.choices[0].message.content;
      if (assistantMessage) {
        addMessage('assistant', assistantMessage);
      }
    } catch (error) {
      console.error("Error fetching chat completion:", error);
      setIsTiming(false); // Stop timing if there's an error
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
            style={{ marginLeft: '5px' }}
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
