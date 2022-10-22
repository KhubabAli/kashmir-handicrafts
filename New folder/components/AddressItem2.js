import Text from "./Text";
import {View, StyleSheet, TouchableWithoutFeedback} from "react-native";

import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default ({
                    item: {
                        addressLine2,
                        city,
                        country,
                        firstName,
                        lastName,
                        phone,
                        postalCode,
                        state,
                        streetAddress,
                    },
                }) => {
    return (
        <>
            <Text style={styles.infoText}>{firstName} {lastName}</Text>
            <Text style={[styles.infoText, styles.nextLine]}>+{phone}</Text>
            <View style={styles.address}>
                <Text
                    style={styles.addressText}>{`${streetAddress}, ${addressLine2 && `${addressLine2}, `} ${city}, ${state}, ${country}`} </Text>
                <Text style={[styles.addressText, styles.nextLine]}>{postalCode}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    address: {
        paddingTop: 4,
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
        color: colors.textGray,
    },
    nextLine: {
        marginTop: 2,
    },
})