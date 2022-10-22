import React, {useState} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";


const Stack = createNativeStackNavigator();

export default () => {

    return (

        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"cart"} component={CartScreen}/>

        </Stack.Navigator>

    )
}