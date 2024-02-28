import React from 'react';

import {Colors,
        CustomHeader,
        CustomHeaderText
    } from './../components/styles';

const {primary, tertiary} = Colors;

//react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Add from './../screens/Add';
import Explore from './../screens/Explore';
import Create from '../screens/Create';
import ExistPlan from '../screens/ExistPlan';

const Stack = createStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions = {{
                    headerTintColor: tertiary,
                    headerTransparent: true,
                    headerTitle: '',
                    headerLeftContainerStyle: {
                        paddingLeft: 20
                    },
                }}
                initialRouteName="Login"
            >
                <Stack.Screen 
                    name = "Login" 
                    component = {Login} 
                />
                <Stack.Screen 
                    name = "Signup" 
                    component = {Signup} 
                />
                <Stack.Screen 
                    name = "Welcome" 
                    component = {Welcome} 
                />
                <Stack.Screen 
                    name = "Home" 
                    component = {Home} 
                    options={{
                         headerLeft: null
                        }}
                />
                <Stack.Screen 
                    name = "Settings"
                    component={Settings}
                />
                <Stack.Screen 
                    name = "Add"
                    component={Add}
                />
                <Stack.Screen 
                    name = "Explore"
                    component={Explore}
                />
                <Stack.Screen 
                    name = "Create"
                    component={Create}
                />
                <Stack.Screen 
                    name = "ExistPlan"
                    component={ExistPlan}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;