import Text from "./Text";
import {View} from "react-native";
import React from "react";

export default ({
                    title,
                    value,
                    style,
                    titleStyle,
                    valueStyle
                }) => {
    return (
        <View style={{
            ...style,
            flexDirection: "row",
            justifyContent: "space-between",
        }}>
            <Text style={titleStyle}>{title}</Text>
            <Text style={valueStyle}>{value}</Text>
        </View>
    )
}