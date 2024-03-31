import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { InnerContainer, PageTitleIII, TextLink, TextLinkContent } from '../components/styles';
import { StatusBar, View, StyleSheet, Text, ScrollView } from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from './../components/CredentialsContext';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    totalExpenseBox: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
    },
    totalExpenseText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    expenseItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        minHeight: 70, 
        minWidth: 330,
    },
    expenseDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    expensePrice: {
        fontSize: 14,
        color: '#666',
    },
});

const Expense = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { planID } = route.params;
    const [expenses, setExpenses] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`http://172.20.10.3:3000/expense/see-expense/${planID}`);
            
            // Check if response data exists and is not null
            if (response.data && response.data.expenses) {
                const allExpenses = response.data.expenses;
                const types = ['Accommodation', 'Food', 'Transportation', 'Others'];
                let total = 0;
                const newExpenses = types.map(type => {
                    const expensesOfType = allExpenses.filter(expense => expense.type === type);
                    total += expensesOfType.reduce((acc, curr) => acc + curr.price, 0);
                    return { type, expenses: expensesOfType };
                });
                setExpenses(newExpenses);
                setTotalExpense(total);
            } else {
                // Handle null response here, for example:
                setExpenses([]);
                setTotalExpense(0);
            }
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };
    
    const renderItem = ({ item }) => (
        <View style={styles.expenseItem}>
            <Text style={styles.expenseDescription}>{item.description}</Text>
            <Text style={styles.expensePrice}>Price: {item.price}</Text>
        </View>
    );

    const navigateToInsertExpense = (type) => {
        navigation.navigate('InsertExpense', { planID, type });
    };

    return (
        <KeyboardAvoidingWrapper>
            <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <StatusBar style="dark" />
                    <InnerContainer >
                        <View style={styles.totalExpenseBox}>
                            <Text style={styles.totalExpenseText}>Total Expense: {totalExpense}</Text>
                        </View>
                        {expenses.map((item, index) => (
                            <View key={index}>
                                <PageTitleIII>{item.type}</PageTitleIII>
                                {item.expenses.map((expense, index) => (
                                    <View key={index} style={styles.expenseItem}>
                                        <Text style={styles.expenseDescription}>{expense.description}</Text>
                                        <Text style={styles.expensePrice}>Price: {expense.price}</Text>
                                    </View>
                                ))}
                                <TextLink onPress={() => navigateToInsertExpense(item.type)} style={{ marginTop: 15, marginBottom: 30 }}>
                                    <TextLinkContent style={{ marginLeft: 15 }}>+ Add new Expense</TextLinkContent>
                                </TextLink>
                            </View>
                        ))}
                    </InnerContainer>
                </View>
            </ScrollView>
        </KeyboardAvoidingWrapper>
    );    
};

export default Expense;