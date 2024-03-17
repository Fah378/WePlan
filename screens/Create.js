import React, {useState, useContext, useEffect}  from 'react';
import { StatusBar } from 'expo-status-bar';

import Add from './Add';

//formik
import { Formik } from 'formik';

import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInputII,
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

//async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './../components/CredentialsContext';

//API client
import axios from 'axios';

const Create = () => {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    //context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { _id, username} = storedCredentials; // Extract userID from storedCredentials
    
    //form handling
    // const handleCreate = (credentials, setSubmitting) => {
    //     handleMessage(null);
    //     const url = 'http://27.55.95.75:3000/plans/plans';

    //     axios
    //         .post(url, credentials)
    //         .then((response) => {
    //             const result = response.data;
    //             const {message, status, data} = result;

    //             if (status !== 'SUCCESS'){
    //                 handleMessage(message, status);
    //             } else {
    //                 navigation.navigate('Add');
    //             }
    //             setSubmitting(false);
    //         })
    //         .catch(error => {
    //         console.log(error);
    //         setSubmitting(false);
    //         handleMessage("An error occured. Check your network and try again.");
    //     })
    // }

    useEffect(() => {
        console.log("Stored Credentials:", storedCredentials);
    }, []); // Log storedCredentials when component mounts

    const handleCreate = (credentials, setSubmitting, resetForm) => {
        handleMessage(null);
    
        // Get userID from storedCredentials
        const { _id: userID } = storedCredentials;
    
        // Set isPublic to false (default)
        credentials.isPublic = false;
    
        const url = 'http://172.20.10.3:3000/plans/plans';
    
        axios
            .post(url, { ...credentials, userID }) // Include userID in the request payload
            .then((response) => {
                const result = response.data;
                const { message, status, data } = result;
    
                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    handleMessage("Create new plan successful.", "SUCCESS");
                    // Clear form values after successful submission
                    resetForm();
                }
                setSubmitting(false);
            })
            .catch(error => {
                console.log(error);
                setSubmitting(false);
                handleMessage("An error occurred. Check your network and try again.");
            });
    };    

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Create New Plan</PageTitle>
                <SubTitle>By {username}</SubTitle>

                <Formik
                    initialValues={{tripName:'', Description:'', startDate:'', endDate:'', tripMembers:''}}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        values = {...values};
                        if(values.tripName == '' || values.startDate == '' || values.endDate == '' || values.tripMembers == ''){
                            handleMessage('Please fill all the fields.');
                            setSubmitting(false);
                        } else {
                            handleCreate(values, setSubmitting, resetForm);
                        }
                    }}
                >{({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                <StyledFormArea>
                    <MyTextInput 
                        label="Trip name"
                        placeholder="Trip name"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('tripName')}  
                        onBlur={handleBlur('tripName')} 
                        value={values.tripName}
                    />
                    <MyTextInput 
                        label="Description"
                        placeholder = "Description"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                    />
                    <MyTextInput 
                        label="Start Date"
                        placeholder = "YYYY - MM - DD"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('startDate')}
                        onBlur={handleBlur('startDate')}
                        value={values.startDate}
                        isDate = {true}
                    />
                    <MyTextInput 
                        label="End Date"
                        placeholder = "YYYY - MM - DD"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('endDate')}
                        onBlur={handleBlur('endDate')}
                        value={values.endDate}
                        isDate = {true}
                    />
                    <MyTextInput 
                        label="Number of Members"
                        placeholder = "2"
                        placeholderTextColor={darklight}
                        onChangeText={handleChange('tripMembers')}
                        onBlur={handleBlur('tripMembers')}
                        value={values.tripMembers}
                        isDate = {true}
                    />
                    <MsgBox type = {messageType}>{message}</MsgBox>
    
                    {!isSubmitting && ( 
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Create plan</ButtonText>
                        </StyledButton>
                    )}

                    {isSubmitting && (
                        <StyledButton disabled = {true}>
                            <ActivityIndicator size = "large" color = {primary}/>
                        </StyledButton>
                    )}
                    {/* <Line />
                    <ExtraView>
                    <ExtraText>Already have an account?  </ExtraText>
                        <TextLink onPress ={() => navigation.navigate("Login") }>
                            <TextLinkContent >Login</TextLinkContent>
                        </TextLink>
                    </ExtraView> */}
                </StyledFormArea>
                )}

                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({label, ...props}) => {
    return (
        <View>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInputII {...props}/>
        </View>
    );
};

export default Create;