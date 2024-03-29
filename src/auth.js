// src\auth.js

import { signIn as amplifySignIn, signOut as amplifySignOut } from '@aws-amplify/auth';

export const signIn = async (username, password) => {
  try {
    const user = await amplifySignIn(username, password);
    console.log('User signed in:', user);
    return user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await amplifySignOut();
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
