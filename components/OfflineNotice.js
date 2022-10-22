import React from 'react';
import {View, StyleSheet} from "react-native";
import {useNetInfo} from "@react-native-community/netinfo";

import Text from './Text'
import colors from "../config/colors";

export default () => {
    const netInfo = useNetInfo();
    if ((netInfo.type === "unknown" && netInfo.isInternetReachable === false) || netInfo.type === "vpn")
        return (
            <View style={[styles.container]}>
                <Text style={styles.text}>No Internet Connection</Text>
            </View>
        )
    return null;
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        bottom: 62,
        height: 50,
        width: "100%",
        position: "absolute",
        elevation: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: colors.white
    }
})