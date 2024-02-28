import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { InnerContainer, PageTitle, WelcomeContainer } from '../components/styles';

const Explore = () => {
    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeContainer>
                    <PageTitle>Trip Searching</PageTitle>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Explore;