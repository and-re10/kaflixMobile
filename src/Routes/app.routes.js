import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../Pages/HomeScreen/index";
import DetailsScreen from "../Pages/DetailsScreen/index";
import SearchScreen from "../Pages/SearchScreen/index";

const Stack =  createStackNavigator();

export default function AppRoutes() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Details" component={DetailsScreen} options={{
                    title: "Details",
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}/>
                <Stack.Screen name="Search" component={SearchScreen} options={{
                    title: "Search",
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}/>
            </Stack.Navigator>
    )
}
