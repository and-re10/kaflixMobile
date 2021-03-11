import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Platform } from 'react-native';
import AuthContext from "../../contexts/auth";
import { Container, Titre, Logo } from "./styles";
import authApi from "../../api/auth"
import { useNavigation } from "@react-navigation/native"

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
});

export default function Register() {
    // Notifications
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    // Register
    // const { signed, signIn } = useContext(AuthContext);
    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("");
    const [userPhone, setUserPhone] = useState("")

    const navigation = useNavigation();

    // console.warn(signed);
    // console.warn(expoPushToken)
    async function handleRegister(){
        authApi.post('/register', {
            "userName": userName,
            "userPhone": userPhone,
            "userPassword": userPassword,
            "userPushToken": expoPushToken
        });

        navigation.navigate('SignIn')

    }

    return (
        <Container style={{flex: 1}}>
            <Logo>Kaflix</Logo>
            <Titre>
                User Name
            </Titre>
            <TextInput placeholder="Enter your name" style={styled.input} onChangeText={(text) => {
                setUserName(text.trim());
            }} placeholderTextColor="white"/>

            <Titre>
                Phone Numbre
            </Titre>
            <TextInput placeholder="Enter your phone number" style={styled.input} onChangeText={(text) => {
                setUserPhone(text.trim());
            }} placeholderTextColor="white"/>

            <Titre>
                Password
            </Titre>
            <TextInput secureTextEntry={true} placeholder="Enter your password" style={styled.input} onChangeText={(text) => {
                setUserPassword(text.trim());
            }} placeholderTextColor="white"/>

            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Button title="Sing in" style={{fontSize: 28, }} color="grey" onPress={() => {handleRegister()}}/>
            </View>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Button title="Back" style={{fontSize: 28, }} color="grey" onPress={() => { navigation.navigate('SignIn')}}/>
            </View>
        </Container>
        
    )
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
// async function sendPushNotification(expoPushToken) {
//     const message = {
//       to: expoPushToken,
//       sound: 'default',
//       title: 'Original Title',
//       body: 'And here is the body!',
//       data: { someData: 'goes here' },
//     };
  
//     await fetch('https://exp.host/--/api/v2/push/send', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Accept-encoding': 'gzip, deflate',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });
//   }
  
  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

// Styles
const styled = StyleSheet.create({
    input: {
        height: 50, 
        paddingHorizontal: 20, 
        borderColor: "lightgrey", 
        borderWidth: 2, 
        borderRadius: 15, 
        marginVertical: 20,
        width: "70%",
        color: "white"
    }
})