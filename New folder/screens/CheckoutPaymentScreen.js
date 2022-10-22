import React, {useEffect, useState} from 'react';
import colors from "../config/colors";
import {useSelector, useDispatch} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";

import {View, BackHandler, FlatList, StyleSheet, Alert} from "react-native";

import routes from "../navigation/routes";
import {setCurrentStep} from "../store/checkoutNav";
import Text from "../components/Text";
import CheckoutListItem from "../components/CheckoutListItem";
import PaymentMethodItem from "../components/PaymentMethodItem";
import {
    saveSelectedPaymentMethod,
    getSelectedPaymentMethod,
    getSelectedBillingAddress,
    saveBillingAddress
} from "../store/addressBook";
import ToggleButton from "../components/ToggleButton";
import AddressItem from "../components/AddressItem";
import AddressItem2 from "../components/AddressItem2";

const paymentMethods = [
    {
        id: 0,
        type: "card",
        brand: "",
        label: "Credit Card",
        description: "Additional Rs. 20 charges for COD services",
        icon: "credit-card-outline"
    },
    {
        label: "JazzCash",
        id: 1,
        type: "jazzcash",
        description: "Additional Rs. 20 charges for COD services",
        icon: "cash"
    },
    {
        id: 2,
        label: "Easy Paisa",
        type: "easypaisa",
        description: "Additional Rs. 20 charges for COD services",
        icon: "cash"

    },
    {
        id: 3,
        label: "Cash on Delivery",
        type: "cod",
        description: "Additional Rs. 20 charges for COD services",
        icon: "cash-marker"

    },
]

export default ({navigation}) => {
    const selectedPaymentMethod = useSelector(getSelectedPaymentMethod);
    const selectedBillingAddress = useSelector(getSelectedBillingAddress);

    const dispatch = useDispatch();

    useFocusEffect(() => {
        dispatch(setCurrentStep(2))
    })

    const selectPaymentMethod = (paymentMethod) => {
        dispatch(saveSelectedPaymentMethod(paymentMethod));
    }

    const goToPayment = () => {
        navigation.navigate(routes.CHECK_OUT_CONFIRM_ORDER)
    }


    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
    useEffect(() => {
        const backHandler = () => {
            navigation.navigate(routes.CHECK_OUT_ADDRESS, {modalOpen: false})
            return true;
        }
        BackHandler.addEventListener('hardwareBackPress', backHandler)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backHandler)
        };
    }, []);

    const handleSelectBillingAddress = () => {
        if (selectedBillingAddress) return dispatch(saveBillingAddress(null));
        navigation.navigate(routes.SELECTBILLINGADDRESS);
    }


    return (
        <>
            <View>
                <Text style={styles.title}>Select a payment method</Text>

            </View>
            <FlatList
                ListFooterComponent={() => (
                    selectedPaymentMethod.id === 3 &&
                    <>
                        <ToggleButton
                            title={"My billing address is the same as my shipping address."}
                            iconName={"checkbox-marked"}
                            enabled={!selectedBillingAddress}
                            onPress={handleSelectBillingAddress}
                            style={{marginEnd: 16, marginTop: 24,}}
                        />
                        {selectedBillingAddress && <View style={{marginStart: 40, marginTop: 8}}><AddressItem2
                            item={selectedBillingAddress}
                        /></View>
                        }
                    </>)
                }
                style={{flexGrow: 0.8}}
                data={paymentMethods}
                renderItem={({item}) =>
                    <CheckoutListItem item={item}
                                      key={item.id}
                                      ItemComponent={PaymentMethodItem}
                                      selectedItem={selectedPaymentMethod}
                                      selectItem={selectPaymentMethod}
                    />}
            />


        </>

    )
}
const styles = StyleSheet.create({
    title: {
        marginTop: 32,
        fontFamily: "LatoBold"
    }
})
