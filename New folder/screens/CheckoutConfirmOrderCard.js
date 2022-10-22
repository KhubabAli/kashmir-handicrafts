import React, {useEffect, useState} from 'react';
import colors from "../config/colors";
import {useStripe} from "@stripe/stripe-react-native";

import {View, BackHandler, StyleSheet, Image} from "react-native";
import routes from "../navigation/routes";
import {setCurrentStep} from "../store/checkoutNav";
import {useFocusEffect} from "@react-navigation/native";
import Text from "../components/Text";
import InfoItem from "../components/InfoItem";

import {useDispatch, useSelector} from "react-redux";

import Button from "../components/Button";
import AddressItem from "../components/AddressItem";
import {getSelectedAddress, getSelectedPaymentMethod, getSavedCard} from "../store/addressBook";

import {getTotalPrice} from "../store/cart";


export default ({route, navigation}) => {
    const shippingAddress = useSelector(getSelectedAddress);
    const selectedPaymentMethod = useSelector(getSelectedPaymentMethod);
    const totalPrice = useSelector(getTotalPrice);
    const savedCard = useSelector(getSavedCard);
    const dispatch = useDispatch();

    console.log("Payment Method", selectedPaymentMethod);
    useEffect(() => {
        const backHandler = () => {
            navigation.navigate(routes.CHECK_OUT_PAYMENT, {modalOpen: false})
            return true;
        }
        BackHandler.addEventListener('hardwareBackPress', backHandler)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backHandler)
        };
    }, []);

    useFocusEffect(() => {
        dispatch(setCurrentStep(3))
    })

    const deliveryCharges = 250;
    return (
        <>
            <View style={styles.headingContainer}>
                <Text style={styles.title}>Please confirm and submit your order</Text>
                <Text style={[styles.titleGrayed, {fontSize: 14,}]}>By clicking submit order, you agree to Kashmir
                    Handicrafts' Terms of Use
                    and
                    Privacy Policy.</Text>
            </View>
            <View>
                <View style={styles.container}>
                    <Text style={styles.cardTitle}>Payment</Text>
                    <View style={styles.paymentMethodContainer}>
                        <Image
                            source={require("../assets/mastercard-240.png")}
                            style={{
                                width: 42,
                                height: 42,
                                resizeMode: "contain"
                            }}
                        />
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            {savedCard && <Text>****{savedCard?.last4}</Text>}
                            {/*<Text>{savedCard.expiryMonth}</Text>*/}
                        </View>
                    </View>
                    <Button
                        title={"Edit"}
                        textStyle={{
                            color: "skyblue"
                        }}
                        style={{
                            position: "absolute",
                            end: 16,
                            top: 16,
                        }}
                    />
                </View>


                <View style={styles.container}>
                    <Text style={styles.cardTitle}>Shipping address</Text>
                    <View style={styles.paymentMethodContainer}>
                        <AddressItem
                            item={
                                shippingAddress
                            }

                        />
                    </View>
                    <Button
                        title={"Edit"}
                        textStyle={{
                            color: "skyblue"
                        }}
                        style={{
                            position: "absolute",
                            end: 16,
                            top: 16,
                        }}
                    />

                </View>

                <View style={styles.container}>
                    <Text style={styles.cardTitle}>Order Summary</Text>

                    <InfoItem
                        style={styles.infoItem}
                        title="Subtotal"
                        value={`Rs. ${totalPrice}`}
                        titleStyle={styles.titleGrayed}
                        valueStyle={styles.valueGrayed}
                    />
                    <InfoItem
                        style={styles.infoItem}
                        title="Delivery"
                        value={`Rs. ${deliveryCharges}`}
                        titleStyle={styles.titleGrayed}
                        valueStyle={styles.valueGrayed}
                    />
                    <InfoItem
                        style={styles.infoItem}
                        title="Total"
                        value={`Rs. ${totalPrice + deliveryCharges}`}
                        titleStyle={[styles.titleGrayed, {
                            color: colors.black
                        }]}
                        valueStyle={{
                            color: colors.black,
                            fontSize: 18,
                        }}
                    />
                </View>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: colors.lightGray,
        borderWidth: 1.5,
        borderRadius: 5,
        padding: 16,
        marginBottom: 16,
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
    title: {
        fontFamily: "LatoBold",
        marginBottom: 16,
    },
    processStepIndicator: {},
    paymentMethodContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    titleGrayed: {
        color: colors.grayC4,
        fontSize: 16,
    },
    valueGrayed: {
        color: colors.textGray,
        fontSize: 16,
    },
    infoItem: {
        marginBottom: 16,
    },
    cardTitle: {
        marginBottom: 24,
    },
    card: {
        marginBottom: 16,
    },
    headingContainer: {
        marginBottom: 32,
    }


})