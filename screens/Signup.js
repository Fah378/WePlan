import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//icons
import {Octicons, Ionicons} from '@expo/vector-icons';

//colors
// import {colors} from './../components/styles';

import {
    StyledContainer,
    InnerContainer,
    PageTitleII,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText, 
    Colors,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from './../components/styles';
import {View, ActivityIndicator} from 'react-native';

//colors
const{brand, darklight, primary} = Colors;

//keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

//API client
import axios from 'axios';

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext );

    //form handling
    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://172.20.10.3:3000/user/signup';

        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS'){
                    handleMessage(message, status);
                } else {
                    persistLogin({...data}, message, status);
                }
                setSubmitting(false);
            })
            .catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage("An error occured. Check your network and try again.");
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('WePlanCredentails', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
        })
        .catch((error) => {
            console.log(error);
            handleMessage('Persisting login failed');
        })
    }

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitleII>WePlan</PageTitleII>
                <SubTitle>Account Sign-up</SubTitle>


                <Formik
                    initialValues={{name:'', username:'', email:'', password:'', passwordConfirmation:''}}
                    onSubmit={(values, {setSubmitting}) => {
                        values = {...values};
                        if(values.email == '' || values.name == '' || values.username == '' || values.password == '' || values.passwordConfirmation == ''){
                            handleMessage('Please fill all the fields.');
                            setSubmitting(false);
                        } else if (values.password !== values.passwordConfirmation){
                            handleMessage('Passwords do not match');
                            setSubmitting(false);
                        }else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                <StyledFormArea>
                    <MyTextInput 
                        label="Full name"
                        icon="person"
                        placeholder="Full name"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('name')}  
                        onBlur={handleBlur('name')} 
                        value={values.name}
                    />
                    <MyTextInput 
                        label="User name"
                        icon = "person"
                        placeholder = "User name"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />
                    <MyTextInput 
                        label="Email Address"
                        icon = "mail"
                        placeholder = "test@gmail.com"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                    />
                    <MyTextInput 
                        label="Password"
                        icon = "lock"
                        placeholder = "* * * * * * * *"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry = {hidePassword}
                        isPassword = {true}
                        hidePassword = {hidePassword}
                        setHidePassword = {setHidePassword}
                    />
                    <MyTextInput 
                        label="Password Confirmation"
                        icon = "lock"
                        placeholder = "* * * * * * * *"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('passwordConfirmation')}
                        onBlur={handleBlur('passwordConfirmation')}
                        value={values.passwordConfirmation}
                        secureTextEntry = {hidePassword}
                        isPassword = {true}
                        hidePassword = {hidePassword}
                        setHidePassword = {setHidePassword}
                    />
                    <MsgBox type = {messageType}>{message}</MsgBox>
    
                    {!isSubmitting && ( 
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Sign-up</ButtonText>
                        </StyledButton>
                    )}

                    {isSubmitting && (
                        <StyledButton disabled = {true}>
                            <ActivityIndicator size = "large" color = {primary}/>
                        </StyledButton>
                    )}
                    <Line />
                    <ExtraView>
                    <ExtraText>Already have an account?  </ExtraText>
                        <TextLink onPress ={() => navigation.navigate("Login") }>
                            <TextLinkContent >Login</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>
                )}

                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isPassword && (
                <RightIcon onPress = {() => setHidePassword(!hidePassword)}>
                    <Ionicons name = {hidePassword ? 'md-eye-off' : 'md-eye'} size = {30} color = {darklight}/>
                </RightIcon>
            )}
        </View>
    );
};


export default Signup;