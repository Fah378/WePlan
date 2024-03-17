// import { createContext } from 'react';

// //credentials context
// export const CredentialsContext = createContext({storedCredentials: {}, setStoredCredentials: () => {}});
import { createContext } from 'react';

// Initial value of storedCredentials with userID, username, and name
const initialStoredCredentials = {
  userID: '', // Add userID property
  username: '', // Add username property
  name: '', // Add name property
};

//credentials context
export const CredentialsContext = createContext({
  storedCredentials: initialStoredCredentials,
  setStoredCredentials: () => {},
});
