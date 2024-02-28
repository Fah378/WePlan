import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';

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

const Welcome = ({navigation, route}) => {
    const { name } = route.params;
    const backgroundImagePath = require('./../assets/background.jpg');

    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={backgroundImagePath} />
                <WelcomeContainer>
                    <PageTitle welcome = {true}>Welcome!</PageTitle>
                    <SubTitle welcome = {true}>{ name }</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/illustration.png')}/>
                        <Line />
                        <StyledButton onPress={() => {navigation.navigate('Home', { name: name })}}>
                            <ButtonText>Let's get started!</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Welcome;