import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import Text from "./Text";

export default ({item, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.imageContainer, {backgroundColor: item.backgroundColor}]}>
                <Image style={styles.image} source={item.image}/>
            </View>
            <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: "center",
        width: "33%"
    },
    image: {
        width: 240,
        height: 240,
        resizeMode: "center"
    },
    imageContainer: {
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: 'center',
        overflow: "hidden",
        borderRadius: 100,
    },
    label: {
        marginTop: 5,
        textAlign: "center"
    }
})