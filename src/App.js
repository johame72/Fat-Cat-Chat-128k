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
  const currentDate = new Date();
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const formattedDate = currentDate.getDate() + '-' + monthNames[currentDate.getMonth()] + '-' + currentDate.getFullYear();
  console.log(formattedDate); // Format: '17-FEB-2024'
  
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={chatIcon} alt="Chat Icon" style={{ maxWidth: '90px', maxHeight: '90px', marginRight: '6px' }} />
          <h2 style={{ margin: '0 4px' }}>Fat Cat Chat</h2>
        </div>
        {user && (
          <>
            <input
              className={styles.apiKeyInput}
              type="password"
              value={apiKey.replace(/./g, 'X')}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="API Key"
              style={{ width: '100px', height: '30px', margin: '0 7px' }}
            />
          </>
        )}
        {!user && <SignInForm />}
        <button onClick={signOut} style={{ border: '1px solid black', margin: '0 7px' }}>Sign out</button>
      </header>
      {user && (
        <div style={{ margin: '0 7px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ marginRight: '10px', margin: 5, fontSize: '1.5rem' }}>{user.username}'s Chat: </h2>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{formattedDate}</h2>
        </div>
      )}

      <ChatComponent apiKey={apiKey} />
    </div>
  );
}

export default withAuthenticator(App);
