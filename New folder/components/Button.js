import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";
// import {Icon} from "react-native-elements";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";

export default ({
                    children,
                    iconName,
                    iconColor = "#fff",
                    iconSize = 28,
                    iconType = "antdesign",
                    onPress,
                    style,
                    textStyle,
                    title,
                }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            {iconName && <MaterialCommunityIcons name={iconName} type={iconType} color={iconColor} size={iconSize}/>}
            {title &&
            <Text style={[{
                color: colors.black,
                fontFamily: "LatoBold",
                fontSize: 16,
            }, textStyle]}>{title}</Text>}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})