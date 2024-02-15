// src/auth.js
import Amplify from 'aws-amplify';

export const signIn = async (username, password) => {
  try {
    const user = await Amplify.Auth.signIn(username, password);
    console.log('User signed in:', user);
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await Amplify.Auth.signOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Add other authentication functions as needed
