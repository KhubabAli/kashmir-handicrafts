import React from "react";
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import colors from "../config/colors";

export default function PaymentPickerItem({
                                              item, onPress, style, pickedItem
                                          }) {
    return (
        <TouchableWithoutFeedback onPress={() => onPress(item)}>
            <View style={[styles.container, style]}>
                <Image source={item.image} style={styles.image}/>
                <Text style={styles.text}>{item.label}</Text>
                <View
                    style={[styles.round, pickedItem.code === item.code ? {backgroundColor: colors.highlighter} : {backgroundColor: colors.gray}]}/>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    text: {
        paddingStart: 16,
        color: colors.darkGray,
        fontFamily: "LatoBold",
        fontSize: 16,
    },
    container: {
        alignItems: "center",
        overflow: "hidden",
        marginVertical: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: colors.lightGray,
        borderRadius: 5,
    },
    image: {
        width: 70,
        height: 70
    },
    round: {
        position: "absolute",
        end: 12,
        alignSelf: "center",
        width: 25,
        height: 25,
        borderRadius: 15
    }
});
