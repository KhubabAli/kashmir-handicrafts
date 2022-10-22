import React from "react";
import {StyleSheet, View} from "react-native";

import Text from '../components/Text'
import colors from "../config/colors";

export default ({name, address, city, zip, phone, style, label, bodyStyle, labelStyle}) => {
    return (
        <View style={style}>
            <Text fontSize={20} color={colors.gray} style={labelStyle}>{label}</Text>
            <View style={bodyStyle}>
                <Text color={colors.darkGray} fontFamily={"LatoBold"} fontSize={16} style={[styles.text, {
                    fontSize: 16,
                    fontFamily: "LatoBold",
                    paddingBottom: 4,
                    color: colors.darkGray
                }]}>{name}</Text>
                <Text color={colors.textGray} fontSize={14} fontFamily={"LatoMedium"}
                      style={[styles.text]}>{address}</Text>
                <Text color={colors.textGray} fontSize={14} fontFamily={"LatoMedium"}
                      style={styles.text}>{city}: <Text>{zip}</Text></Text>
                <Text color={colors.textGray} fontSize={14} fontFamily={"LatoMedium"} style={[styles.text]}>Phone: <Text
                    color={colors.darkGray} fontFamily={"LatoMedium"}>{phone}</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "LatoMedium",
        color: colors.textGray,
        fontSize: 14
    }
})