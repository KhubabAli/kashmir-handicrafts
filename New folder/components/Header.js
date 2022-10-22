import React from 'react';
import {Text, StyleSheet, View, Image} from "react-native";

import colors from "../config/colors";
import Button from "./Button";

export default ({leftIcon = "arrow-left", onLeftButtonPress, rightIcon, onRightButtonPress, title, style}) => {
    return (

        <View style={[styles.container, style]}>
            <Button iconName={leftIcon} iconColor={colors.darkGray} style={styles.leftIcon} iconSize={24}
                    onPress={() => onLeftButtonPress()}/>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Button iconName={rightIcon} iconColor={colors.darkGray} style={styles.rightIcon} iconSize={24}
                    onPress={() => onRightButtonPress()}/>

        </View>
    )
}


const styles = StyleSheet.create({
    leftIcon: {
        position: "absolute",
        left: 0,
    },
    rightIcon: {
        position: "absolute",
        right: 0,
    },

    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        fontFamily: "LatoRegular",
        fontSize: 18,
    },
    title: {
        alignContent: "center",
        fontFamily: "LatoMedium",
        fontSize: 18,
        color: colors.darkGray
    },
    waterMarkSmallest: {
        width: 80,
        height: 80,
        position: "absolute",
        opacity: 0.09,
        alignSelf: "center",
        top: -40,
    },
})