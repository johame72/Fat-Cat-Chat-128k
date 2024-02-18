// src\SettingsPage.js

import React, { useState } from 'react';
import { useUser } from './UserContext'; // Import the useUser hook

const SettingsPage = () => {
  const { setUserApiKey } = useUser();
  const [apiKeyInput, setApiKeyInput] = useState('');

  const handleSaveApiKey = () => {
    setUserApiKey(apiKeyInput);
    // Optionally, save the API key to the backend associated with the user's account
    // You would typically make an API call here to securely store the API key server-side
    alert("API Key saved successfully!");
  };

  return (
    <div>
      <h2>Enter Your OpenAI API Key</h2>
      <input
        type="text"
        value={apiKeyInput}
        onChange={(e) => setApiKeyInput(e.target.value)}
        placeholder="Enter your OpenAI API key"
      />
      <button onClick={handleSaveApiKey}>Save API Key</button>
    </div>
  );
};

export default SettingsPage;
