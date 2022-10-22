import Text from "./Text";
import {View, StyleSheet, TouchableWithoutFeedback} from "react-native";

import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default ({name, price, status, style}) => {
    return (
        <View style={style}>
            <Text style={styles.infoText}>{name}</Text>
            <Text style={[styles.infoText, styles.nextLine]}>{price}</Text>
            <Text style={[styles.infoText, styles.nextLine]}>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    address: {
        paddingTop: 24,
    },
    addressText: {
        fontFamily: "LatoLight",
        color: colors.textGray,
        fontSize: 14,
    },
    container: {
        borderColor: colors.lightGray,
        borderWidth: 1.5,
        borderRadius: 4,
        marginTop: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    checkIcon: {
        position: "absolute",
        end: 12,
        top: 12,

    },
    infoText: {
        fontFamily: "LatoRegular",
        fontSize: 14,
    },
    nextLine: {
        marginTop: 2,
    },
})