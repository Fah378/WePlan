import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { InnerContainer, PageTitle, StyledFormArea, StyledButton, ButtonText, Line, WelcomeContainer } from '../components/styles';

const Add = ({navigation}) => {
    return (
        <>
            <StatusBar style="dark" />
                <InnerContainer style={{ backgroundColor: 'white' }}>
                    <StyledFormArea>
                    <StyledButton onPress={() => 
                        { navigation.navigate('Create')} } 
                        style={{ marginTop: 30 }
                        }>
                        <ButtonText>Create New Plan</ButtonText>
                    </StyledButton>
                    <StyledButton onPress={() => 
                        { navigation.navigate('ExistPlan') }} 
                        style={{ marginTop: 30 }
                        }>
                        <ButtonText>See Previous Plan</ButtonText>
                    </StyledButton>
                    </StyledFormArea>
                </InnerContainer>
        </>
    );
};

export default Add;