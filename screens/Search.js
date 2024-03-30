import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import {  PageTitleIII, 
  Colors, 
  TripPanel, 
  TripPanelText, 
  SubTitle,
  CustomHeader,
  CustomHeaderText,
  MsgBox,
  StyledFormAreaII,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon
} from './../components/styles';
import { useNavigation } from '@react-navigation/native'; 
import { CredentialsContext } from './../components/CredentialsContext';
import SettingsScreen from './Settings';
import PlansScreen from './Plans';
import ExploreScreen from './Explore';
import TripDetails from './TripDetails';
import styled from 'styled-components/native';

//colors
const{ darklight, brand} = Colors;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // Aligns children in a row
    justifyContent: 'space-between', // Positions children with space between them
    alignItems: 'center', // Aligns children vertically in the center
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    // This style isn't necessary for text alignment but can be used for other text styling
  },
  iconButton: {
    // This can be empty if you don't need specific styling, or you can add padding/margin if desired
  },
});

const Search = ({ name }) => {
  const [tripDetails, setTripDetails] = useState([]);
  const [userTripDetails, setUserTripDetails] = useState([]);
  const [publicTripDetails, setPublicTripDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { storedCredentials } = useContext(CredentialsContext);
  const navigation = useNavigation();
  const [messageType, setMessageType] = useState();
  const [message, setMessage] = useState();

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

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
  return (
      <View>
          <LeftIcon>
              <Octicons name={icon} size={30} color={brand} />
          </LeftIcon>
          <StyledInputLabel>{label}</StyledInputLabel>
          <StyledTextInput {...props}/>
      </View>
  );
};

return (
  <View>
    <PageTitleIII>Welcome, {name}</PageTitleIII>
    <StyledFormAreaII>
      <MyTextInput 
          placeholder="Search"
          placeholderTextColor={darklight}
          icon = "search"
      />
      <MsgBox type = {messageType}>{message}</MsgBox>
    </StyledFormAreaII>
    <SubTitle>    See your Plans.</SubTitle>
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

export default Search;