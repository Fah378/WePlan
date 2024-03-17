import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Add from './../screens/Add';
import Explore from './../screens/Explore';
import Create from '../screens/Create';
import ExistPlan from '../screens/ExistPlan';
import TripDetails from '../screens/TripDetails';

// Import CredentialsContext
import { CredentialsContext } from './../components/CredentialsContext';

const Stack = createStackNavigator();

const RootStack = () => {
  const { storedCredentials } = useContext(CredentialsContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide header by default
        }}
        initialRouteName={storedCredentials ? "Welcome" : "Login"} // Set initial route based on storedCredentials
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen 
            name="Create" 
            component={Create} 
            options={{
                headerShown: true, 
                headerBackTitle: 'Back',
              }}
        />
        <Stack.Screen 
            name="ExistPlan" 
            component={ExistPlan} 
            options={{
                headerShown: true, 
                headerBackTitle: 'Back',
                headerTitle: 'List of Exist Plan',
              }}
        />
        <Stack.Screen 
            name="TripDetails" 
            component={TripDetails} 
            options={{
                headerShown: true, 
                headerBackTitle: 'Back',
                headerTitle: 'Trip Details',
              }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;