// src/App.js

import React from 'react';
import styles from './App.module.css';
import ChatComponent from './ChatComponent';
import SignInForm from './SignInForm'; // Import the SignInForm component
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from '@aws-amplify/auth';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';

Amplify.configure(config);

function App({ signOut, user }) {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>OpenAI Chat 'gpt-4-0125-preview' 128k Tokens</h1>
        {/* Display the username and sign out button if the user is signed in */}
        {user && (
          <>
            <h2>Hello {user.username}</h2>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
        {/* Display the SignInForm component if the user is not signed in */}
        {!user && <SignInForm />}
        <ChatComponent />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
