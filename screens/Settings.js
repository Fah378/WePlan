// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { InnerContainer, PageTitle, StyledFormArea, StyledButton, ButtonText, Line, WelcomeContainer } from '../components/styles';

// const Profile = ({navigate}) => {
//     return (
//         <>
//             <StatusBar style="dark" />
//             <InnerContainer>
//                 <WelcomeContainer>
//                     <PageTitle>This is Settings page.</PageTitle>
//                     <StyledFormArea>
//                         <Line />
//                         <StyledButton onPress={() => { navigation.navigate('Login') }}>
//                             <ButtonText>Log out</ButtonText>
//                         </StyledButton>
//                     </StyledFormArea>
//                 </WelcomeContainer>
//             </InnerContainer>
//         </>
//     );
// };

// export default Profile;
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { InnerContainer, PageTitle, StyledFormArea, StyledButton, ButtonText, Line, WelcomeContainer } from '../components/styles';

const Profile = ({ navigation }) => {
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

export default Profile;
