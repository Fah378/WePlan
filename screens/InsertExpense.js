import React, { useContext, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { InnerContainer, PageTitleIII, StyledContainer, StyledTextInputII, StyledButton, ButtonText, MsgBox } from '../components/styles';
import { StatusBar, View, Alert } from 'react-native'; // Import Alert
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from './../components/CredentialsContext';
import axios from 'axios';

const InsertExpense = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { planID, type } = route.params;
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleConfirm = async () => {
        try {
            const response = await axios.post('http://172.20.10.3:3000/expense/insert', {
                type,
                description,
                price,
                plansID: planID
            });
            if (response.data.status === 'SUCCESS') {
                // Display success notification
                Alert.alert('Success', 'Expense added successfully');
            } else {
                // Handle failure
            }
        } catch (error) {
            console.error('Error adding new expense:', error);
            // Handle error
        }
    };

    return (
        <StyledContainer>
            <PageTitleIII>Insert Expense</PageTitleIII>
            <StyledTextInputII
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <StyledTextInputII
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            {message ? <MsgBox>{message}</MsgBox> : null}
            <StyledButton onPress={handleConfirm}>
                <ButtonText>Confirm</ButtonText>
            </StyledButton>
        </StyledContainer>
    );
};

export default InsertExpense;