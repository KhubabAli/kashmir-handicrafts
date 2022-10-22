import React from 'react';
import {useSelector, useDispatch} from "react-redux";

import {Alert, StyleSheet,} from "react-native";
import routes from "../navigation/routes";
import {getAddresses, saveSelectedAddress, getSelectedAddress} from "../store/addressBook";
import {setCurrentStep} from "../store/checkoutNav";
import {useFocusEffect} from "@react-navigation/native";
import AddressPicker from "../components/forms/AddressPicker";
import customersApi from "../api/customers";


export default ({navigation}) => {
    const dispatch = useDispatch();
    const addresses = useSelector(getAddresses)
    const selectedAddress = useSelector(getSelectedAddress)


    const goToPayment = async () => {

    }

    useFocusEffect(() => {
        dispatch(setCurrentStep(1))
    })

    const selectAddress = (address) => {
        // setSelectedAddress(address);
        dispatch(saveSelectedAddress(address));
    }

    return (
        <AddressPicker selectedAddress={selectedAddress}
                       onPress={() => navigation.navigate(routes.ADDRESSFORMSCREEN)}
                       selectAddress={selectAddress}
                       addresses={addresses}
        />
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 32,
        fontFamily: "LatoBold"
    }
})

