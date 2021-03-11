import React from "react"
import SignIn from "../Pages/SignIn/index";
import Register from "../Pages/Register/index";

import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

function AuthRoutes(){
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='SignIn' component={SignIn} options={{
                    title: "SignIn",
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}/>
            <AuthStack.Screen name='Register' component={Register} options={{
                    title: "SignIn",
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}/>
        </AuthStack.Navigator>      
    )
    
}

export default AuthRoutes;