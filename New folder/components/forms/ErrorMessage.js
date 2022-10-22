import React from 'react';
import Text from "../Text";
import {StyleSheet} from "react-native";

export default ({error, visible}) => {
    if (!visible || !error) return null;
    return (
        <Text style={styles.text}>{error}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "red"
    }
})