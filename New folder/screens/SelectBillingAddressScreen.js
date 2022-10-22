import React from 'react';
import {useSelector, useDispatch} from "react-redux";

import {StyleSheet, View,} from "react-native";
import routes from "../navigation/routes";
import {getAddresses, saveBillingAddress, getSelectedBillingAddress} from "../store/addressBook";
import AddressPicker from "../components/forms/AddressPicker";
import colors from "../config/colors";


export default ({navigation}) => {
    const dispatch = useDispatch();
    const addresses = useSelector(getAddresses)
    const selectedBillingAddress = useSelector(getSelectedBillingAddress)

    const goToPayment = () => {
        navigation.navigate(routes.CHECK_OUT_PAYMENT)
    }


    const selectAddress = (address) => {
        dispatch(saveBillingAddress(address));
        navigation.navigate(routes.CHECK_OUT_PAYMENT);
    }

    return (
        <>
            <View
                style={{
                    backgroundColor: colors.overlayBlack,
                    paddingHorizontal: 16,
                    paddingBottom: 42,
                    justifyContent: "flex-end",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0
                }}
            />
            <View style={{
                backgroundColor: colors.white,
                paddingHorizontal: 16,
                paddingBottom: 42,
                justifyContent: "flex-end",
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0
            }}>
                <AddressPicker selectedAddress={selectedBillingAddress}
                               onPress={() => navigation.navigate(routes.ADDRESSFORMSCREEN)}
                               selectAddress={selectAddress}
                               addresses={addresses}
                               title={"Select Billing Address"}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 32,
        fontFamily: "LatoBold"
    }
})

