import React from 'react';
import {Image, TouchableHighlight} from "react-native";
import {View, StyleSheet} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from "../config/colors";
import Text from "./Text";


export default (
    {
        ImageComponent,
        image,
        onPress,
        renderRightAction,
        subtitle,
        title,
    }
) => {
    console.log(title, subtitle)
    return (
        <Swipeable renderRightActions={renderRightAction}>
            <TouchableHighlight onPress={onPress} underlayColor={colors.background}>
                <View style={styles.container}>
                    {ImageComponent}
                    {image && <Image source={image} style={styles.image}/>}
                    <View style={styles.detailContainer}>
                        <Text style={styles.title} numberOfLines={1}>
                            {title}
                        </Text>
                        {subtitle && (
                            <Text numberOfLines={2} style={styles.subtitle}>
                                {subtitle}
                            </Text>
                        )}
                    </View>
                    <MaterialCommunityIcons
                        name={"chevron-right"}
                        size={24}
                        color={colors.textGray}
                    />
                </View>
            </TouchableHighlight>
        </Swipeable>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 15,
        flexDirection: "row",
    },
    detailContainer: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: "center",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    title: {
        fontWeight: "700",
    },
    subtitle: {
        color: colors.textGray,
    }
})

