import React from 'react';
import {Text, View} from "react-native";
import colors from "../config/colors";

export default ({text, style}) => {
    return (
        <View style={[{flexDirection: "row", justifyContent: 'center'}, style]}>
            <View style={{
                backgroundColor: colors.primary,
                borderRadius: 50,
                paddingHorizontal: 12,
                paddingVertical: 4,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text
                    style={{fontFamily: "LatoLight", color: colors.secondary}}>{text}</Text>
            </View>
        </View>
    )
}