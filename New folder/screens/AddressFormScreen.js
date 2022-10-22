import React, {useEffect} from 'react';
import {useSelector, useDispatch,} from "react-redux";
import {BackHandler, StyleSheet} from "react-native";

import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "./Screen";
import AddressForm from "../components/forms/AddressForm";
import {addAddress} from "../store/addressBook";

export default ({navigation}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const backHandler = () => {
            navigation.navigate(routes.CHECKOUT);
            return true;
        }
        BackHandler.addEventListener('hardwareBackPress', backHandler)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backHandler)
        };
    }, []);


    const saveAddress = (props) => {
        console.log(props);
        dispatch(addAddress(props))
    }

    return (
        <Screen style={styles.container}>
            <AddressForm handleSubmit={saveAddress}/>
        </Screen>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        top: 64,
        marginHorizontal: 16,
        paddingHorizontal: 8,
        marginTop: 48,
        flexGrow: 1,
        justifyContent: "flex-end",
        paddingBottom: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: "absolute",
        bottom: 0,
        start: 0,
        end: 0,
    },
})