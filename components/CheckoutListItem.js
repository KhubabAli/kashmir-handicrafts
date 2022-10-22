import Text from "./Text";
import {View, StyleSheet, TouchableWithoutFeedback} from "react-native";

import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import ListItem from "./ListItem";

export default ({
                    ItemComponent = ListItem,
                    item,
                    selectedItem,
                    selectItem
                }) => {
    console.log("itemId", item.id, "selectedId", selectedItem);
    const isSelected = selectedItem?.id === item.id;
    return (
        <>
            <TouchableWithoutFeedback onPress={() => selectItem(item)}>
                <View style={isSelected ?
                    [styles.container, {
                        borderColor: colors.primary,
                        backgroundColor: colors.lightGray,
                    }] : styles.container
                }>

                    {isSelected && <MaterialCommunityIcons
                        style={styles.checkIcon}
                        name={"check-circle-outline"}
                        color={colors.primary}
                        size={32}/>}
                    <ItemComponent item={item}/>

                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: colors.lightGray,
        borderWidth: 1.5,
        borderRadius: 4,
        marginTop: 16,
        paddingVertical: 14,
        overflow: "hidden",
        paddingHorizontal: 16,
        paddingEnd: 24
    },
    checkIcon: {
        position: "absolute",
        end: 12,
        top: 12,

    },
})