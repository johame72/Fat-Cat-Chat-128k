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
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={styles.App} style={{ padding: '7px' }}>
      <header className={styles.AppHeader} style={{ marginBottom: '7px' }}>
        <img src={chatIcon} alt="Chat Icon" style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '7px' }} />
        <h1 style={{ margin: '7px' }}>Fat Cat Chat</h1>
        {/* Display the user's name and sign out button if the user is signed in */}
        {user && (
          <>
            <h2 style={{ margin: '7px' }}>{user.username}'s Chat - {currentDate}</h2>
            <button onClick={signOut} style={{ margin: '7px' }}>Sign out</button>
          </>
        )}
        {/* Display the SignInForm component if the user is not signed in */}
        {!user && <SignInForm />}
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          style={{ margin: '7px' }}
        />
        <ChatComponent apiKey={apiKey} />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
