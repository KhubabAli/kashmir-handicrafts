import React, {useState} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import OrdersScreen from "../screens/OrdersScreen";
import routes from "./routes";

const Stack = createNativeStackNavigator();
export default () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"Profile"} component={ProfileScreen}/>
            <Stack.Screen name={"Login"}
                          component={LoginScreen}
                          options={{presentation: "fullScreenModal"}}/>
            <Stack.Screen name={routes.ORDERS} component={OrdersScreen}/>
        </Stack.Navigator>

    )
}

