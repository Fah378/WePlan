import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { InnerContainer, 
  PageTitle, 
  WelcomeContainer, 
  Colors, 
  CustomHeader, 
  CustomHeaderText,
  Line, 
 } from './../components/styles';

// Screens
import SettingsScreen from './Settings';
import AddScreen from './Add';
import ExploreScreen from './Explore';

const HomeScreen = ({route}) => {
  const { name } = route.params || {}; // Set default value for name
  
  return (
    <InnerContainer style={{ backgroundColor: 'white' }}>
      <PageTitle>Plans Suggestion</PageTitle>
      <Line />
      <PageTitle>Latest Visit</PageTitle>
      <Line />
      <PageTitle>Ad</PageTitle>
      <PageTitle>{name ? `Welcome, ${name}` : 'Welcome'}</PageTitle>
    </InnerContainer>
  );
};

const Tab = createBottomTabNavigator();

const Home = () => {
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
        headerShown: true,
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
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
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