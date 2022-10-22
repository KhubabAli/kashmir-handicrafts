import React from 'react';
import {TextInput, View, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import defaultStyles from "../config/styles"

export default ({icon, style, width = "100%", ...otherProps}) => {
    return (
        <View style={[styles.container, {width}]}>
            {icon && <Icon name={icon} color={defaultStyles.colors.textGray} size={20} style={styles.icon}/>}
            <TextInput placeholderTextColor={defaultStyles.colors.textGray}
                       style={[defaultStyles.text, style]} {...otherProps}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: defaultStyles.colors.lightGray,
        marginVertical: 10,
        padding: 10,
        flexDirection: "row",
        borderRadius: 5,
    },
    icon: {
        marginRight: 10,
    },
})