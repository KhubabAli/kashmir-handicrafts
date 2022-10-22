import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    TouchableHighlight,
    View
} from "react-native";
import Text from '../components/Text';
import colors from "../config/colors";

export default ({
                    productImage, title, onPress,
                }) => {

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => onPress()} style={{
                borderRadius: 5, overflow: "hidden", elevation: 0.3,
            }}><View
                style={styles.imageContainer}><ImageBackground style={[styles.backgroundImage]}
                                                               source={productImage}>
                <View style={{
                    backgroundColor: "#ffffff",
                    width: "100%",
                    height: "20%",
                    alignSelf: "flex-end",
                    justifyContent: "center",
                }}><Text color={colors.textGray} fontSize={20}
                         style={{marginStart: 8}}>{title}</Text></View></ImageBackground></View></TouchableHighlight></View>)
}
const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode: "cover",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        backgroundColor: colors.lightGray,
    },
    buttonText: {fontSize: 11},
    container: {paddingHorizontal: 4, paddingBottom: 8, width: "50%",},
    imageContainer: {height: 200,},
    price: {paddingTop: 4, fontFamily: "LatoMedium", fontSize: 16, flex: 0.5,},
    title: {paddingTop: 8, fontFamily: "LatoLight", fontSize: 14, flex: 0.5,},
    actionButton: {
        position: "absolute",
        paddingHorizontal: 8,
        right: 0,
        bottom: 0,
        paddingVertical: 8,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    detailContainer: {paddingStart: 6,}
})