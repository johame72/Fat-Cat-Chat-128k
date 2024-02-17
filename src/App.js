// src/App.js

import React, { useState } from 'react';
import styles from './App.module.css';
import ChatComponent from './ChatComponent';
import SignInForm from './SignInForm';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
import chatIcon from './FatCatRobot.png';

Amplify.configure(config);

function App({ signOut, user }) {
  const [apiKey, setApiKey] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={chatIcon} alt="Chat Icon" style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '7px' }} />
          <h1 style={{ margin: '0 7px' }}>Fat Cat Chat</h1>
        </div>
        {user && (
          <>
            <h2 style={{ margin: '0 7px' }}>{user.username}'s Chat - {currentDate}</h2>
            <input
              type="password"
              value={apiKey.replace(/./g, 'X')}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your OpenAI API key"
              style={{ width: '60ch', margin: '0 7px' }}
            />
          </>
        )}
        {!user && <SignInForm />}
        <button onClick={signOut} style={{ border: '1px solid black' }}>Sign out</button>
      </header>
      <ChatComponent apiKey={apiKey} />
    </div>
  );
}

export default withAuthenticator(App);
