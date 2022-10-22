import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

import BannerButton from './BannerButton';
import colors from "../config/colors";

export default ({title, buttonTitle, titleColor, image, onTap}) => {
    return (
        <TouchableWithoutFeedback onPress={() => onTap()}>
            <View style={styles.container}>

                <View style={styles.bannerContentContainer}>
                    <Text style={styles.headline}>{title}</Text>
                    <BannerButton style={styles.bannerButton} onTap={onTap}>SHOP NOW</BannerButton>
                </View>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={image}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    image: {
        right: -80,
        top: -10,
        position: "absolute",
        resizeMode: "cover",
        alignItems: "center",
        flexDirection: "row",
        overflow: "hidden",
        height: 500,
        width: 300,

    },
    container: {
        justifyContent: "flex-start",
        backgroundColor: colors.lightGray,
        flex: 1,
        flexDirection: "row",
        overflow: "hidden",
    },
    headline: {
        fontFamily: "LatoBold",
        fontSize: 24,
    },
    bannerContentContainer: {
        paddingStart: 28,
        width: "50%",
        height: 350,
        paddingTop: 28,
    },
    imageContainer: {
        overflow: "hidden",
        width: "50%",
        height: 350,
        paddingTop: 28,
    },
    bannerButton: {
        marginTop: 16,
        marginEnd: 42,
        paddingHorizontal: 20,
        paddingVertical: 10,
    }

})