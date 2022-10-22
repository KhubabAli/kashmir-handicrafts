import React from 'react';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import Text from "./Text";
import colors from "../config/colors";

export default ({
                    iconName,
                    enabled,
                    iconSize = 24,
                    style,
                    onPress,
                    title
                }) => {
    const color = enabled ? colors.primary : colors.grayC4;
    return <View style={[style]}>
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.button}>
                <MaterialCommunityIcons name={enabled ? "checkbox-marked" : "checkbox-blank-outline"} color={color}
                                        size={iconSize}/>
                {title && <Text style={[styles.title, {color}]}>{title}</Text>}
            </View>
        </TouchableWithoutFeedback>
    </View>
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        marginStart: 12,
        fontSize: 14,
        fontFamily: "LatoBold",

    }
})