import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function Icon({
                                 iconName,
                                 iconColor = "#fff",
                                 backgroundColor = "#000",
                                 size = 40,
                             }) {
    return (
        <View
            style={{
                width: size,
                height: size,
                backgroundColor,
                borderRadius: size / 2,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <MaterialCommunityIcons
                name={iconName}
                color={iconColor}
                size={size * 0.5}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
