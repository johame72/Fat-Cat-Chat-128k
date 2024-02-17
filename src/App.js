// src\App.js

import React, { useState } from 'react';
import styles from './App.module.css';
import ChatComponent from './ChatComponent';
import SignInForm from './SignInForm'; // Import the SignInForm component
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
import chatIcon from './FatCatRobot.png'; // Import the chat icon

Amplify.configure(config);

function App({ signOut, user }) {
  const [apiKey, setApiKey] = useState('');
  const currentDate = new Date().toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
  
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={chatIcon} alt="Chat Icon" style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '7px' }} />
          <h1 style={{ margin: '0 7px' }}>Fat Cat Chat</h1>
        </div>
        {user && (
          <>
            <input
              type="password"
              value={apiKey.replace(/./g, 'X')}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your OpenAI API key"
              style={{ width: '36ch', margin: '0 7px' }}
            />
          </>
        )}
        {!user && <SignInForm />}
        <button onClick={signOut} style={{ border: '1px solid black', margin: '0 7px' }}>Sign out</button>
      </header>
      {user && (
        <div style={{ margin: '0 7px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ marginRight: '10px', margin: 5, fontSize: '1.5rem' }}>{user.username}'s Chat </h2>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{currentDate}</h2>
        </div>
      )}

      <ChatComponent apiKey={apiKey} />
    </div>
  );
}

export default withAuthenticator(App);
