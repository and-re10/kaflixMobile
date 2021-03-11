import React, { useState, createContext, useEffect } from "react";
import { View, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import * as auth from "../services/auth";
import authApi from "../api/auth";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [userPhone, setUserPhone] = useState("0123456789");
    // const [userPassword, setUserPassword] = useState("$2a$10$RJ9BIwLpFsSGl/h6Ym9mDewz/WhtBqOsRgsQxWIJUBAsRyLqBeaNW");
    // const [userToken, setUserToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNlOTAyYjRhZWIzZjBjMTQ1ZDBlMTEiLCJpYXQiOjE2MTQ3ODYxMDB9.R3bzIqTqIEpZHvIzhuLwDjaEAXjzcJdtwwl77Efl058")

    useEffect(() => {
        async function loadStorageData(){
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');

            // await new Promise(resolve => setTimeout(resolve, 2000))
           
            if (storagedUser && storagedToken){
                authApi.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
                // setLoading(false)
            }
            
            
        };
        loadStorageData();
    }, []);

    async function signIn(phone, password){
        // const response = await auth.signIn();
        const response = await authApi.post('/login', {
            "userPhone": phone,
            "userPassword": password
        })

        // console.warn(response)
        setUser(response.data.user);

        authApi.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

        await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.data.user))
        await AsyncStorage.setItem('@RNAuth:token', response.data.token)  
    }

    function signOut(){
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    // if (loading){
    //     return (
    //         <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    //             <ActivityIndicator size="large"/>
    //         </View>
    //     );
    // };
    
    return (
        <AuthContext.Provider value={{signed: !!user, user: user, signIn, signOut, loading}}>
            { children }
        </AuthContext.Provider>
    )
    
}

export default AuthContext;