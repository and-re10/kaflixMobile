import React, { useContext } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import AuthContext from "../contexts/auth";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes(){
    const { signed, loading } = useContext(AuthContext);

    // if (loading){
    //     return (
    //         <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    //             <ActivityIndicator size="large"/>
    //         </View>
    //     );
    // };

    return signed? <AppRoutes/> : <AuthRoutes/>;
}

export default Routes;
