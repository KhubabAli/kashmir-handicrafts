import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableHighlight, View} from "react-native";

import binaryToImage from "../utility/images";
import colors from "../config/colors";
import SetNumberButton from "./SetNumberButton";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {color} from "react-native-elements/dist/helpers";

export default ({
                    touchBlocked,
                    setItemCount,
                    productImage,
                    _id,
                    productName,
                    price,
                    count,
                    maxItems = 10,
                    size,
                    colour,
                    renderRightAction,
                    onIncrement,
                    onDecrement
                }) => {
    const [productCount, setProductCount] = useState(count);
    const [countButtonVisible, setCountButtonVisible] = useState(true);

    useEffect(() => {
        setProductCount(count);
    }, [count]);


    useEffect(() => {
        setItemCount({_id: _id, count: productCount});
    }, [productCount])

    return (
        <GestureHandlerRootView style={{marginBottom: 24,}}>
            {touchBlocked && <View style={{


                position: "absolute",
                backgroundColor: "blue",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 6
            }}/>}
            <View style={{flexDirection: "row",}}>
                <Swipeable renderRightActions={renderRightAction}
                           onBegan={() => setCountButtonVisible(false)}
                           onSwipeableWillClose={() => setCountButtonVisible(true)}
                           containerStyle={{flex: 1}}
                >
                    <View style={styles.container}>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <View style={styles.imageContainer}>
                                <ImageBackground style={styles.backgroundImage} source={{
                                    uri: binaryToImage(productImage)
                                }}>


                                </ImageBackground>
                            </View>

                            <View style={styles.detailContainer}>
                                <View style={styles.detailsSubContainer}>

                                    <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>Embroided Red
                                        Shirt</Text>
                                    <Text style={styles.price}>Rs. {price}</Text>
                                </View>

                                <View style={styles.detailsSubContainer}>
                                    <Text
                                        style={styles.labelLight}>Size: <Text
                                        style={styles.price}>{size}</Text></Text>

                                    <View style={styles.colorContainer}>
                                        <Text
                                            style={styles.labelLight}>Color: </Text>
                                        <View style={[styles.color, {backgroundColor: colour}]}/>
                                        <View style={styles.actionButtonsContainer}>

                                            {<SetNumberButton productCount={productCount}
                                                              setProductCount={setProductCount}
                                                              maxItems={maxItems}
                                                              onIncrement={onIncrement}
                                                              onDecrement={onDecrement}


                                            />}

                                        </View>
                                    </View>


                                </View>


                            </View>
                        </View>


                    </View>
                </Swipeable>
            </View>
        </GestureHandlerRootView>
    )

}

const styles = StyleSheet.create({
    actionButtonsContainer: {
        position: "absolute",
        end: 0,
        bottom: 0
    },
    backgroundImage: {
        resizeMode: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 4,
        overflow: "hidden",
        flex: 1,

    },
    buttonText: {
        fontSize: 11
    }
    ,
    color: {
        borderRadius: 50,
        height: 16,
        marginStart: 8,
        width: 16,

    },
    container: {
        flex: 1,
        flexDirection: "row",

    },
    imageContainer: {
        height: 100,
        width: 100,
        alignSelf: "center"
    },
    price: {
        fontFamily: "LatoBold",
        fontSize: 18,
        color: colors.primary
    },
    size: {
        color: colors.primary
    },
    title: {
        fontFamily: "LatoMedium",
        fontSize: 16,
    },
    actionButton: {
        position: "absolute",
        paddingHorizontal: 8,
        right: 0,
        bottom: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0

    },
    detailContainer: {
        flex: 1,
        paddingStart: 12,
        paddingEnd: 4,
        justifyContent: "space-between",
    },
    touchableHighlights: {
        paddingBottom: 14
    },
    colorContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    labelLight: {
        color: colors.grayC4,
        fontFamily: "LatoLight",
        marginTop: 2,
    },
    detailsSubContainer: {
        marginVertical: 6,
    },

})