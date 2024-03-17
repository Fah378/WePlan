import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText, 
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from './../components/styles';

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Welcome = () => {
    
    //context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { name } = storedCredentials;
    const backgroundImagePath = require('./../assets/background.jpg');

    const navigation = useNavigation(); // Use useNavigation hook to get navigation prop

    const clearLogin = () => {
        AsyncStorage.removeItem('WePlanCredentails')
        .then(() => {
            setStoredCredentials("");
        })
        .catch(error => console.log(error))
    }

    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={backgroundImagePath} />
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome!</PageTitle>
                    <SubTitle welcome={true}>{name}</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/illustration.png')} />
                        <Line />
                        <StyledButton onPress={clearLogin}>
                            <ButtonText>Let's get started!</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Welcome;