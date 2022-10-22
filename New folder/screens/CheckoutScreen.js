import React, {useEffect, useState} from 'react';
import {View, BackHandler, StyleSheet, Alert} from "react-native";
import {useSelector} from "react-redux";
import {useConfirmPayment} from "@stripe/stripe-react-native";

import Button from "../components/Button";
import colors from "../config/colors";
import CheckoutNavigator from "../navigation/CheckoutNavigator";
import ProcessStepsIndicator from "../components/ProcessStepsIndicator";
import routes from "../navigation/routes";
import Screen from "./Screen";
import {getAddresses, getSelectedAddress} from "../store/addressBook";
import {getItemsWithIds} from "../store/cart";
import {getCurrentStep} from "../store/checkoutNav";
import customersApi from "../api/customers";
import ordersApi from "../api/orders";
import paymentApi from "../api/payment";
import {setUser, getUser} from "../store/user"

export default ({navigation}) => {
    console.log("Checkout Screen is opened");
    const selectedAddress = useSelector(getSelectedAddress);
    const currentStep = useSelector(getCurrentStep);
    const addresses = useSelector(getAddresses);
    const itemsWithIdsAndCounts = useSelector(getItemsWithIds);
    const [customerId, setCustomerId] = useState(null);
    const {confirmPayment, loading} = useConfirmPayment();
    const user = useSelector(getUser);

    useEffect(() => {
        console.log("Checkout Screen use Effect is called")
        const backHandler = () => {
            navigation.navigate("cart", {modalOpen: false})
            return true;
        }
        BackHandler.addEventListener('hardwareBackPress', backHandler)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backHandler)
        };
    }, []);

    const registerCustomer = async () => {
        return await customersApi.registerCustomer(
            addresses,
            addresses[0].firstName,
            addresses[0].lastName,
            addresses[0].phone,
            addresses[0].email,
            selectedAddress,
        )
    }

    const placeOrder = async () => {
        const response = await ordersApi.placeOrder(customerId, itemsWithIdsAndCounts);
        console.log("now the order is placed" + response.data);
        await makePayment(response.data);
    }

    const makePayment = async (orderId) => {
        console.log("Make payment is called");
        const {data: {clientSecret}} = await paymentApi.getClientSecret(orderId);
        console.log("client secret is: " + clientSecret);
        const {error, paymentIntent} = await confirmPayment
        (clientSecret, {
            paymentMethodType: 'Card',
            billingDetails: {name: "Khubaib Ali"}
        })
        if (error){
            console.log(`Error is here ${error.code}`, error.message)
            Alert.alert(`Error Code: ${error.code}`, error.message)}
        else if (paymentIntent)
            Alert.alert('Success:', paymentIntent.id)
        // console.log(response.data);
    }


    const goToPayment = async () => {
        if (currentStep === 1) {
            const response = await registerCustomer();
            if (response.ok) {
                setCustomerId(response.data);
                navigation.navigate(routes.CHECK_OUT_PAYMENT);
            } else {
                Alert.alert("Failed, check your connection", response.data);
            }
        } else if (currentStep === 2) {
            navigation.navigate(routes.CHECK_OUT_CONFIRM_ORDER);
        } else if (currentStep === 3) {
            placeOrder();
        }
    }

    return (

        <Screen>
            <View style={styles.container}>
                <View style={{
                    paddingHorizontal: 24,
                    paddingBottom: 28,
                    paddingTop: 12,
                    backgroundColor: "#f5f5f5",
                    height: 70,
                    top: 0,
                    start: 0,
                    end: 0,
                    justifyContent: "center"
                }}>
                    <ProcessStepsIndicator
                        style={styles.processStepIndicator}
                        currentStep={currentStep}
                        steps={[
                            {number: 1, name: "Address"},
                            {number: 2, name: "Payment"},
                            {number: 3, name: "Review"}]}/>
                </View>

                <View style={styles.subContainer}>

                    <View style={{
                        flexGrow: 1,
                    }}>
                        <CheckoutNavigator/>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                        <Button textStyle={{color: colors.primary}}
                                onPress={() => navigation.navigate("cart", {modalOpen: false})}
                                style={{
                                    marginStart: 8,
                                    borderRadius: 100,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16
                                }}
                                title={"BACK"}
                        />
                        <Button textStyle={{color: colors.white, paddingHorizontal: 24}}
                                iconColor={colors.secondary} textColor={colors.secondary}
                                style={{
                                    backgroundColor: colors.primary,
                                    borderRadius: 100,
                                    paddingVertical: 14,
                                    paddingHorizontal: 16
                                }}
                                onPress={() => goToPayment()}
                                title={"PROCEED TO PAYMENT"}
                        />
                    </View>
                </View>
            </View>
        </Screen>
    )

}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        bottom: 0,
        justifyContent: "flex-end",
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
        overflow: "hidden",
        left: 0,
        right: 0,


    },
    subContainer: {
        flexGrow: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        borderRadius: 5,
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingTop: 24,

    },
    processStepIndicator: {}

})