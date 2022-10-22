import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default ({colors, onSelectColor, selectedColor, setSelectedColor, style}) => {
    console.log('colors', colors)
    return (
        <View style={style}>
            <Text style={styles.text}>Color</Text>
            <View style={styles.container}>
                {colors.map(
                    (color) => (
                        <View
                            style={[styles.indicator, selectedColor === color ? {borderWidth: 1.5} : {borderWidth: 0}]}>
                            <TouchableOpacity onPress={() => setSelectedColor(color)}
                                              style={[styles.colorCircle, {backgroundColor: color}]}/>
                        </View>
                    )
                )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    colorCircle: {
        width: 28,
        height: 28,
        borderRadius: 16,
    },
    container: {
        alignItems: "center",
        paddingTop: 4,
        flexDirection: "row",
    },
    indicator: {
        marginEnd: 12,
        padding: 4,
        borderWidth: 0,
        borderRadius: 5,
    },
    text: {
        fontSize: 14,
        fontFamily: "LatoBold",
    }
})