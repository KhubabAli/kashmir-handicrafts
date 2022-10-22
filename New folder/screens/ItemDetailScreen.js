import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Easing, Animated, StyleSheet, Text, View} from "react-native";
import ImagesViewPager from "../components/ImagesViewPager";
import colors from "../config/colors";
import TextButton from "../components/TextButton";
import ToggleButton from "../components/ToggleButton";
import SetNumberButton from "../components/SetNumberButton";
import Button from "../components/Button";
import routes from "../navigation/routes";
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import _ from 'lodash';
import {useDispatch, useSelector} from "react-redux";

import itemsApi from "../api/items";
import imagesApi from "../api/images"
import {addItem} from "../store/cart";
import {addFavourite, removeFavourite, isInFavourites} from "../store/addressBook";

import ColorPallete from "../components/ColorPallete";
import LottieView from "lottie-react-native";
import Shimmer from "../components/Shimmer";
import ItemDetail from "../components/skeletons/ItemDetail";
import {MaterialCommunityIcons} from "@expo/vector-icons";


export default ({navigation, route: {params: {itemId}}}) => {
    const dispatch = useDispatch();
    const isFavourite = useSelector(isInFavourites(itemId));


    const [item, setItem] = useState(null);
    const [images, setImages] = useState([]);
    // const [isFavourite, setIsFavourite] = useState(true);
    const [itemCount, setItemCount] = useState(1);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const imagesFadeAnim = useRef(new Animated.Value(0)).current;


    const handleIncrement = () => itemCount < item.numberInStock && setItemCount(itemCount + 1);
    const handleDecrement = () => itemCount > 1 && setItemCount(itemCount - 1);
    const handleFavourite = () => isFavourite ? dispatch(removeFavourite(itemId)) : dispatch(addFavourite(itemId));

    const fadeIn = (animation) => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 900,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }
    // const fadeOut = () => {
    //     // Will change fadeAnim value to 0 in 3 seconds
    //     Animated.timing(fadeAnim, {
    //         toValue: 0,
    //         duration: 3000,
    //     }).start();
    // };

    useEffect(() => {
        loadItem();
    }, []);

    useEffect(() => {
        loadImages();
    }, [item])

    const loadItem = async () => {
        const response = await itemsApi.getItem(itemId);
        setItem(response.data);
        fadeIn(fadeAnim);
    }

    const loadImages = async () => {
        if (!item?.imagesId) return;

        const response = await imagesApi.getImages(item.imagesId);
        setImages(response.data.images);
        fadeIn(imagesFadeAnim);
    }


    const addToCart = async () => {
        const newItem = {
            ..._.pick(item, ["thumbnail", "name", "price", "_id", "color"]),
            count: itemCount
        }
        dispatch(addItem(newItem));
        navigation.navigate(routes.CART);
    }


    return (
        <View style={{flex: 1}}>
            <View style={{position: "absolute", top: 0, bottom: 0, left: 0, right: 0}}>
                {images.length === 0 && <View style={{width: "100%", height: 450}}>
                    <Shimmer height={"100%"} width={"100%"}/>
                </View>}
                {!item &&
                <ItemDetail style={[styles.detailContainer]}/>
                }
            </View>
            {item && <ScrollView style={{flex: 1, width: "100%", backgroundColor: colors.white}}>
                <Animated.View style={{width: "100%", height: 450, opacity: imagesFadeAnim}}>
                    <ImagesViewPager images={images} style={{
                        flex: 1,
                    }}/>
                </Animated.View>
                <Animated.View style={{opacity: fadeAnim}}>
                    <View style={[styles.detailContainer]}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>Rs. {item.price}</Text>

                        <ColorPallete colors={[item.color]}
                                      style={styles.colorPallete}/>

                        <View style={styles.sizeContainer}>
                            <Text style={styles.text}>Size</Text>
                            <Text style={[styles.text, {
                                fontFamily: "LatoRegular",
                                color: colors.textGray,
                                marginTop: 4
                            }]}>{item.size}</Text>
                        </View>

                        <View style={styles.descriptionContainer}>
                            <Text style={[styles.text,]}>Description</Text>
                            <TextButton style={styles.sizeGuideButton}>Size Guide</TextButton>
                        </View>
                        <Text style={[styles.text, styles.descriptionText]}>{item.description}</Text>

                        <View style={styles.rightButtonsContainer}>
                            <MaterialCommunityIcons name={"heart"} size={32}
                                                    color={isFavourite ? colors.primary : colors.gray}
                                                    onPress={handleFavourite}
                            />
                            <SetNumberButton
                                style={{top: 16}}
                                maxItems={item.numberInStock}
                                productCount={itemCount}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                            />
                        </View>


                    </View>
                    <View style={[styles.bottomButtonsContainer, {paddingBottom: useBottomTabBarHeight()}]}>
                        <Button textStyle={{color: colors.secondary, paddingStart: 8}}
                                iconColor={colors.secondary} textColor={colors.secondary}
                                iconName="cart"
                                style={{
                                    backgroundColor: colors.primary,
                                    borderRadius: 100,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16
                                }}
                                iconSize={24}
                                onPress={addToCart}
                                title={"Add to Cart"}
                        />
                        <Button iconName="heart" iconColor={colors.primary}
                                textStyle={{color: colors.primary, paddingStart: 8}}
                                iconSize={24}
                                style={{
                                    marginStart: 8,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16
                                }}
                                title={"Buy now"}
                                iconType={"feather"}

                        />
                    </View>
                </Animated.View>
            </ScrollView>}
            <Button iconName="arrow-left" iconColor={colors.darkGray} iconSize={24}
                    style={{position: "absolute", top: 40, left: 16,}}
                    onPress={() => navigation.navigate(routes.LISTINGS)}
            />


        </View>
    )
}

const styles = StyleSheet.create({
    colorPallete: {
        paddingTop: 36
    },
    detailContainer: {
        backgroundColor: colors.white,
        width: "100%",
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 28
    },
    name: {
        fontSize: 18,
        fontFamily: "LatoMedium"
    },
    price: {
        fontSize: 24,
        fontFamily: "LatoBold",
        paddingTop: 8
    },
    text: {
        fontSize: 14,
        fontFamily: "LatoBold",

    }, sizeGuideButton: {
        textDecorationLine: 'underline',
        color: colors.highlighter
    },
    rightButtonsContainer: {
        position: "absolute", end: 28, top: 16, alignItems: "flex-end"
    },
    bottomButtonsContainer: {
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        marginBottom: 24
    },
    sizeContainer: {
        marginTop: 12
    },
    descriptionContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingTop: 12
    },
    descriptionText: {
        paddingTop: 2,
        fontFamily: "LatoMedium",
        color: colors.gray
    }

})