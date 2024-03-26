import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import {  PageTitleIII, 
  Colors, 
  TripPanel, 
  TripPanelText, 
  SubTitle,
  CustomHeader,
  CustomHeaderText } from './../components/styles';
import { useNavigation } from '@react-navigation/native'; 
import { CredentialsContext } from './../components/CredentialsContext';
import SettingsScreen from './Settings';
import PlansScreen from './Plans';
import ExploreScreen from './Explore';
import TripDetails from './TripDetails';

const HomeScreen = ({ name }) => {
  const [tripDetails, setTripDetails] = useState([]);
  const [userTripDetails, setUserTripDetails] = useState([]);
  const [publicTripDetails, setPublicTripDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { storedCredentials } = useContext(CredentialsContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserPlans = async () => {
      try {
        if (!storedCredentials) {
          // If storedCredentials is null, do not proceed with fetching user plans
          return;
        }

        const response = await fetch(`http://172.20.10.3:3000/plans/plans/${storedCredentials?._id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch user plans: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const formattedTripDetails = data.tripDetails.map(trip => ({
          ...trip,
          startDate: formatDate(trip.startDate),
          endDate: formatDate(trip.endDate),
        }));
        // Sort userTripDetails based on startDate
        formattedTripDetails.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        setUserTripDetails(formattedTripDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user plans:', error);
        setError('Failed to fetch user plans. Please try again later.');
        setLoading(false);
      }
    };

    const fetchPublicPlans = async () => {
      try {
        const response = await fetch(`http://172.20.10.3:3000/plans/public-plans`);

        if (!response.ok) {
          throw new Error(`Failed to fetch public plans: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const formattedTripDetails = data.tripDetails.map(trip => ({
          ...trip,
          startDate: formatDate(trip.startDate),
          endDate: formatDate(trip.endDate),
        }));
        // Sort publicTripDetails based on startDate
        formattedTripDetails.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        setPublicTripDetails(formattedTripDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching public plans:', error);
        setError('Failed to fetch public plans. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserPlans();
    fetchPublicPlans();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const navigateToTripDetails = (trip) => {
    navigation.navigate('TripDetails', { 
      trip: trip,
      onPlanMadePublic: fetchPlans // Pass the callback function here
    });
  };

const renderUserItem = ({ item }) => (
  <TouchableOpacity onPress={() => navigateToTripDetails(item)}>
    <TripPanel>
      <TripPanelText>
        <SubTitle>{item.tripName}</SubTitle>
        <Text>{'\n'}</Text>
        <SubTitle>{item.startDate} - {item.endDate}</SubTitle>
      </TripPanelText>
    </TripPanel>
  </TouchableOpacity>
);

const renderPublicItem = ({ item }) => (
  <TouchableOpacity onPress={() => navigateToTripDetails(item)}>
    <TripPanel>
      <TripPanelText>
        <SubTitle>{item.tripName}</SubTitle>
        <Text>{'\n'}</Text>
        <SubTitle>{item.startDate} - {item.endDate}</SubTitle>
      </TripPanelText>
    </TripPanel>
  </TouchableOpacity>
);

return (
  <View>
    <PageTitleIII>Welcome, {name}</PageTitleIII>
    <FlatList
      data={userTripDetails}
      renderItem={renderUserItem}
      keyExtractor={(item, index) => `user_${index}`}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
    <PageTitleIII>New Plans Arrival</PageTitleIII>
    <FlatList
      data={publicTripDetails}
      renderItem={renderPublicItem}
      keyExtractor={(item, index) => `public_${index}`}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);
};
const Tab = createBottomTabNavigator();

const Home = () => {
  const { storedCredentials } = useContext(CredentialsContext);

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
        header: ({route }) => (
          <CustomHeader>
            <CustomHeaderText>{route.name}</CustomHeaderText>
          </CustomHeader>
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Plans') {
            iconName = 'book';
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
        // pass the userID as a prop to the HomeScreen component
        children={() => <HomeScreen name={storedCredentials?.name} />}
      />
      <Tab.Screen
        name="Explore"
        // pass the userID as a prop to the ExploreScreen component
        children={() => <ExploreScreen userID={storedCredentials?._id} />}
      />
      <Tab.Screen
        name="Plans"
        component={PlansScreen}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default Home;