import React, { useContext }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { InnerContainer,
    StyledFormArea, 
    StyledButton, 
    ButtonText, 
    Line, 
    WelcomeContainer,
    SubTitle
} from '../components/styles';

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Test = ({ navigation }) => {
    //context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeContainer>
                    <StyledFormArea>
                        <SubTitle>Test</SubTitle>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Test;
