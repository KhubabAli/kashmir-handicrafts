import React from 'react';
import {TouchableOpacity, StyleSheet} from "react-native";
import Text from "./Text";

export default ({item, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        padding: 20
    }
})