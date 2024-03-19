import { createContext } from 'react';

// Initial value of storedCredentials with userID, username, and name
const initialStoredCredentials = {
  plansID: '', // Add userID property
  trip: '', // Add username property
  name: '', // Add name property
};

//credentials context
export const CredentialsContextPlan = createContext({
  storedCredentials: initialStoredCredentials,
  setStoredCredentials: () => {},
});
