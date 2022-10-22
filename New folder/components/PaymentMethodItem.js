import Text from "./Text";
import {StyleSheet, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from "../config/colors";
import Button from "./Button";
import ToggleButton from "./ToggleButton";
import CardPayment from "./CardPayment";

export default ({item: {label, id, icon, description, isSelected = true}}) => {
    return (
        <>
            <View>
                <View style={styles.container}>
                    {icon && <MaterialCommunityIcons name={icon} size={32}/>}
                    <Text style={styles.label}>{label}</Text>
                </View>
                <Text style={styles.description}>{description}</Text>
            </View>
            {id === 0 && <CardPayment/>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    description: {
        fontFamily: "LatoRegular",
        fontSize: 14,
        color: colors.textGray,
        paddingTop: 4
    },
    label: {
        paddingStart: 4
    }
})