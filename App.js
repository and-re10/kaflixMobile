import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import Routes from "./src/Routes/index";
// import AppRoutes from "./src/Routes/app.routes";
import { AuthProvider } from "./src/contexts/auth";

export default function App() {

  const colors = {
    bg : 'white',
    color: 'black'
  }
  // const navigation = useNavigation();
  return (
    <NavigationContainer>
        <AuthProvider>
          <ThemeProvider theme={colors}>
            <StatusBar style="light" backgroung="white" translucent={true} />
            <Routes/>
          </ThemeProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}


