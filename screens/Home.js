import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios'; // Import axios for making HTTP requests
import { InnerContainer, 
  PageTitleIII, 
  Colors, 
  CustomHeader, 
  CustomHeaderText, Line 
} from './../components/styles';

import { useNavigation } from '@react-navigation/native'; 

// Import your screens here
import SettingsScreen from './Settings';
import AddScreen from './Add';
import ExploreScreen from './Explore';

// Import CredentialsContext to access stored credentials
import { CredentialsContext } from './../components/CredentialsContext';

const HomeScreen = ({ name }) => {
  return (
    <InnerContainer style={{ backgroundColor: 'white' }}>
      <PageTitleIII>Welcome, {name}</PageTitleIII>
      <Line />
    </InnerContainer>
  );
};

const Tab = createBottomTabNavigator();

const Home = () => {
  const [username, setUsername] = useState('');
  const { storedCredentials } = useContext(CredentialsContext);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     try {
  //       if (!storedCredentials || !storedCredentials.user_id) {
  //         throw new Error("User ID is missing.");
  //       }
  //       const response = await axios.get(`http://172.20.10.3:3000/user/userdata/${storedCredentials.user_id}`);
  //       setUsername(response.data.username);
  //     } catch (error) {
  //       console.error('Error fetching username:', error);
  //       // Handle different types of errors
  //       if (axios.isAxiosError(error)) {
  //         console.error('Axios Error Details:', error.response?.data);
  //       }
  //     }
  //   };

  //   fetchUsername();

  //   return () => {
  //     // Cleanup tasks, if any
  //   };
  // }, [storedCredentials]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.brand,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: Colors.primary,
        },
        // headerShown: true,
        header: ({route }) => (
          <CustomHeader>
            <CustomHeaderText>{route.name}</CustomHeaderText>
          </CustomHeader>
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Add') {
            iconName = 'plus';
          } else if (route.name === 'Settings') {
            iconName = 'gear';
          } else if (route.name === 'Explore') {
            iconName = 'globe';
          }

          return <Octicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeScreen name={storedCredentials?.name} />}
      </Tab.Screen>
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default Home;