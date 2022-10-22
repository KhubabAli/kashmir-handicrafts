import React from "react";
import {StyleSheet, View, Text} from "react-native";
import colors from "../config/colors";
import {range} from "../utility/arrays";

export default ({style, selectedPage, totalPages = 0}) => {
    return (
        <View style={[styles.container, style]}>
            {
                range(0, totalPages).map(p =>
                    <View style={[styles.indicator, selectedPage === p ? styles.active : styles.inactive]}/>)
            }
        </View>
    )


}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    indicator: {
        marginHorizontal: 4,
        width: 10,
        height: 10,
        borderRadius: 10,
        borderColor: colors.secondary
    },
    active: {
        backgroundColor: colors.primary
    },
    inactive: {
        borderWidth: 1,
    }
})