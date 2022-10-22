import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default ({sizes, selectedSize, setSelectedSize, style}) => {
    console.log('sizes', sizes)
    return (
        <View style={style}>
            <Text style={styles.text}>Selet Sizes</Text>
            <View style={styles.container}>
                {sizes.map(
                    (size) => (
                        <View
                            style={[styles.indicator, selectedSize === size ? {borderWidth: 1.5} : {borderWidth: 0}]}>
                            <TouchableOpacity onPress={() => setSelectedSize(size)}
                                              style={[styles.sizeItem]}>
                                <Text style={[styles.text, {fontSize: 18, fontFamily: "LatoLight"}]}>{size}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

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
    sizeItem: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 14,
        fontFamily: "LatoBold",
    }
})