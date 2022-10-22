import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import binaryToImage from "../utility/images";

import {Buffer} from "buffer";
import BannerButton from "./BannerButton";
import colors from "../config/colors";
import Shimmer from "./Shimmer";

export default ({thumbnail, productName, price, color, soldOut, onPress, onAddToCart}) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onPress()}>
                <View style={styles.imageContainer}>
                    <ImageBackground style={styles.backgroundImage} source={{
                        uri: binaryToImage(thumbnail), //data.data in your case
                    }}>
                        <BannerButton
                            onTap={onAddToCart}
                            textStyle={styles.buttonText}
                            style={styles.actionButton}>
                            Add to Cart
                        </BannerButton>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

            <View style={styles.detailContainer}>
                <Text style={styles.title}>{productName}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 5,
        overflow: "hidden",
        flex: 1,
        backgroundColor: colors.lightGray,

    },
    buttonText: {
        fontSize: 11
    }
    ,
    container: {
        marginBottom: 16,
        paddingHorizontal: 6,
        width: "50%",
    },
    imageContainer: {
        height: 240,
    },
    price: {
        paddingTop: 4,
        fontFamily: "LatoMedium",
        fontSize: 16,
        flex: 0.5,
    },
    title: {
        paddingTop: 8,
        fontFamily: "LatoLight",
        fontSize: 14,
        flex: 0.5,
    },
    actionButton: {
        position: "absolute",
        paddingHorizontal: 8,
        right: 0,
        bottom: 0,
        paddingVertical: 8,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0

    },
    detailContainer: {
        paddingStart: 6,
    }

})