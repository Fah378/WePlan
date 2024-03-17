// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';

//screens
// import Login from './screens/Login';
// import Signup from './screens/Signup';
// import Welcome from './screens/Welcome';
// import Create from './screens/Create';
// import Home from './screens/Home';

//react navigation stack
import RootStack from './navigators/RootStack';

//apploading
import AppLoading from 'expo-app-loading';

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './components/CredentialsContext';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage
    .getItem('WePlanCredentails')
    .then((result) => {
      if (result !== null) {
        setStoredCredentials(JSON.parse(result));
      } else {
        setStoredCredentials(null);
      }
    })
    .catch(error => console.log(error))
    .finally(() => setAppReady(true));
  }

  if(!appReady) {
    return <AppLoading 
      startAsync = {checkLoginCredentials}
      onFinish = {() => setAppReady(true)}
      onError = {console.warn}
    />
  }

  return (
  <CredentialsContext.Provider value = {{storedCredentials, setStoredCredentials}}>
    <RootStack/>
  </CredentialsContext.Provider>)
  ;
}