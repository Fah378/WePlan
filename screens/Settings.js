import React, { useContext }  from 'react';
import { StatusBar } from 'expo-status-bar';
import { InnerContainer,
    StyledFormArea, 
    StyledButton, 
    ButtonText
} from '../components/styles';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Settings = ({ navigation }) => {
    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <StyledFormArea>
                    <StyledButton onPress={() => { navigation.navigate('Login') }}>
                        <ButtonText>Log out</ButtonText>
                    </StyledButton>
                </StyledFormArea>
            </InnerContainer>
        </>
    );
};

export default Settings;
