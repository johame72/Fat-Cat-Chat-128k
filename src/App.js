// src/App.js

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

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader} style={{ display: 'flex', alignItems: 'center' }}>
        <img src={chatIcon} alt="Chat Icon" style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '7px' }} />
        <h1 style={{ margin: '0 7px' }}>Fat Cat Chat</h1>
        {/* Display the user's name and sign out button if the user is signed in */}
        {user && (
          <>
            <h2 style={{ margin: '0 7px' }}>{user.username}'s Chat</h2>
            <button onClick={signOut} style={{ margin: '0 7px' }}>Sign out</button>
          </>
        )}
        {/* Display the SignInForm component if the user is not signed in */}
        {!user && <SignInForm />}
      </header>
      <div style={{ padding: '7px' }}>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          style={{ margin: '0 0 7px 0', width: 'calc(100% - 14px)' }}
        />
        <ChatComponent apiKey={apiKey} />
      </div>
    </div>
  );
}

export default withAuthenticator(App);
