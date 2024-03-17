import React, { useContext }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { InnerContainer,
    StyledFormArea, 
    StyledButton, 
    ButtonText, 
    Line, 
    WelcomeContainer 
} from '../components/styles';

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Settings = ({ navigation }) => {
    //context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

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
                <WelcomeContainer>
                    <StyledFormArea>
                        <StyledButton onPress={() => { navigation.navigate('Login') }}>
                            <ButtonText>Log out</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Settings;
