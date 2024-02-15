// src/App.js

import React from 'react';
import styles from './App.module.css';
import ChatComponent from './ChatComponent';
import SignInForm from './SignInForm'; // Import the SignInForm component

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1>OpenAI Chat 'gpt-4-0125-preview' 128k Tokens</h1>
        <SignInForm /> {/* Add the SignInForm component */}
        <ChatComponent />
      </header>
    </div>
  );
}

export default App;
