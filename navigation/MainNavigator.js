import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AppNavigator from "./AppNavigator";
import routes from "./routes";
import CheckoutScreen from "../screens/CheckoutScreen";
import AddressFormScreen from "../screens/AddressFormScreen";
import SelectBillingAddressScreen from "../screens/SelectBillingAddressScreen";
import React from "react";
import FilterScreen from "../screens/FilterScreen";


const Stack = createNativeStackNavigator();
export default () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={routes.APPNAVIGATOR} component={AppNavigator}/>
            <Stack.Screen name={routes.CHECKOUT} component={CheckoutScreen} options={{
                animation: "slide_from_bottom"
            }}/>
            <Stack.Screen name={routes.FILTER} component={FilterScreen}
                          options={{
                              animation: "slide_from_bottom",
                              presentation: "containedModal"
                          }}/>

            <Stack.Screen name={routes.ADDRESSFORMSCREEN} component={AddressFormScreen} options={{
                presentation: "transparentModal",
                animation: "slide_from_bottom"
            }}/>
            <Stack.Screen
                name={routes.SELECTBILLINGADDRESS}
                component={SelectBillingAddressScreen}
                options={{
                    headerShown: false,
                    animation: "slide_from_bottom",
                    presentation: "transparentModal"
                }}
            />

        </Stack.Navigator>
    )
}