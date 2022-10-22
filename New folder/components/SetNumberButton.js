import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Button from "./Button";
import colors from "../config/colors";

export default ({style, productCount, setProductCount, maxItems = 9, onIncrement, onDecrement}) => {
    return <View style={[styles.container, style]}>

        <Button iconName="minus"
                iconColor={"#ebebeb"}
                iconSize={32}
                style={styles.button}
                onPress={onDecrement}/>
        <Text style={styles.number}>{productCount}</Text>
        <Button iconName="plus"
                iconColor={"#ebebeb"}
                iconSize={32}
                style={styles.button}
                onPress={onIncrement}/>
    </View>
}

const styles = StyleSheet.create({
    button: {},
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 100,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#ebebeb"

    },
    number: {
        fontFamily: "LatoMedium",
        fontSize: 18,
        paddingHorizontal: 8,
    }
})