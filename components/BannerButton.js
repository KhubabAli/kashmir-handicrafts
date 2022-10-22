import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "../config/colors";

export default ({children, style, onTap, textStyle}) => {
    return (
        <TouchableOpacity style={[styles.actionButton, style]} onPress={() => onTap()}>
            <Text style={[styles.buttonText, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        borderRadius: 5,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",

    },
    buttonText: {
        fontFamily: "LatoBold",
        fontSize: 14,
        color: colors.white
    }
})