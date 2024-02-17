// src\index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import awsConfig from './amplifyconfiguration.json'; // Import the non-sensitive configuration
import { UserProvider } from './UserContext'; // Import the UserProvider

// Merge the non-sensitive configuration with the sensitive configuration from environment variables
const config = {
  ...awsConfig,
  aws_cognito_identity_pool_id: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
};

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
