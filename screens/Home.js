import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { InnerContainer, 
  PageTitleIII, 
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

const HomeScreen = ({ name }) => {
  const [tripDetails, setTripDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { storedCredentials } = useContext(CredentialsContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        if (!storedCredentials) {
          // If storedCredentials is null, do not proceed with fetching plans
          return;
        }

        const response = await fetch(`http://172.20.10.3:3000/plans/plans/${storedCredentials?._id}`, {});

        if (!response.ok) {
          throw new Error(`Failed to fetch plans: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const formattedTripDetails = data.tripDetails.map(trip => ({
          ...trip,
          startDate: formatDate(trip.startDate),
          endDate: formatDate(trip.endDate),
        }));
        // Sort tripDetails based on startDate
        formattedTripDetails.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        setTripDetails(formattedTripDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError('Failed to fetch plans. Please try again later.');
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Function to navigate to TripDetails screen with trip details
  const navigateToTripDetails = (trip) => {
    navigation.navigate('TripDetails', { tripDetails: trip });
};

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <TripPanel onPress={() => navigateToTripDetails(item)}>
        <TripPanelText>
          <Text> 
            <SubTitle>{item.tripName}</SubTitle>
          </Text>
          <Text>{'\n'}</Text>
          <Text>
            <SubTitle>{item.startDate} - {item.endDate}</SubTitle>
          </Text>
        </TripPanelText>
      </TripPanel>
    </TouchableOpacity>
  );  

  return (
    <View>
      <PageTitleIII>Welcome, {name}</PageTitleIII>
      <FlatList
        data={tripDetails}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
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
      <Tab.Screen name="Home">
        {() => <HomeScreen name={storedCredentials?.name} />}
      </Tab.Screen>
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
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