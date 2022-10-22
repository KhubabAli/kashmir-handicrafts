import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CheckoutAddressScreen from "../screens/CheckoutAddressScreen";
import {StripeProvider} from "@stripe/stripe-react-native";

import routes from "./routes";
import CheckoutPaymentScreen from "../screens/CheckoutPaymentScreen";
import CheckoutConfirmOrderCard from "../screens/CheckoutConfirmOrderCard";

const publishableKey = "pk_test_51KrFMWBn872em2EjlvfsQ2ZyniEkdnt4Origm4KO2NSQgXrANifdIKlrUATJHhLT2YigmrxOW3cDLHL6AXMSTZ2M00pRJ0GltM"


const Stack = createNativeStackNavigator();
export default ({onBackPress}) => {
    return (
        <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier={"merchant.identifier"}
        >
            <Stack.Navigator>
                <Stack.Screen
                    name={routes.CHECK_OUT_ADDRESS}
                    component={CheckoutAddressScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={routes.CHECK_OUT_PAYMENT}
                    component={CheckoutPaymentScreen}
                    options={{
                        headerShown: false,
                        animation: "slide_from_right"
                    }}

                />
                <Stack.Screen
                    name={routes.CHECK_OUT_CONFIRM_ORDER}
                    component={CheckoutConfirmOrderCard}
                    options={{headerShown: false}}
                />

            </Stack.Navigator>
        </StripeProvider>
    )
}