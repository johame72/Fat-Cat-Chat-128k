// src/auth.js
import { Auth } from '@aws-amplify/auth';

export const signIn = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    console.log('User signed in:', user);
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Add other authentication functions as needed
