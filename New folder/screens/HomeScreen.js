import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet, ImageBackground, FlatList, Image} from "react-native";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";

import colors from "../config/colors";
import BannerViewPager from "../components/BannerViewPager";
import routes from "../navigation/routes";
import Header from "../components/Header";
import CategoryListItem from "../components/CategoryListItem";
import categoryApi from "../api/categories"

const listings = [
    {
        productImage: require("../assets/redponchobtrans.png"),
        title: "Shawls",
        catId: "sh",
        key: 1,
    },
    {
        productImage: require("../assets/redponchobtrans.png"),
        title: "Ponchos",
        catId: "pn",
        soldCout: false,
        key: 2,

    },
    {
        productImage: require("../assets/redponchobtrans.png"),
        title: "Pherans",
        catId: "ph",
        soldCout: false,
        key: 3,

    },
    {
        productImage: require('../assets/redponchobtrans.png'),
        title: "Dresses",
        catId: "dr",
        key: 5,
    }, {
        productImage: require('../assets/redponchobtrans.png'),
        title: "Gowns",
        catId: "gn",

        key: 6,
    }, {
        productImage: require('../assets/redponchobtrans.png'),
        title: "Pashmina",
        catId: "ps",
        key: 7,
    },

]


export default ({navigation}) => {
    const [categories, setCategories] = useState([]);
 
    useEffect( () => {
        loadCategories();
    }, [])


    const loadCategories = async () => {
        const response = await categoryApi.getCategories();
        if(response.ok){
            setCategories([...response.data])
            console.log("HomeScreen: Cageories are", response.data);
        }else{
            console.log("Cageories are here but response is not ok", response); 
        }
    }

    return (
        <View style={styles.conatiner}>
            <Header title="Kashmir Handicrafts"
                    leftIcon={"menu"}
                    rightIcon={"shopping-cart"}
                    style={styles.header}
                    onLeftButtonPress={() => navigation.navigate(routes.HOME)}
                    onRightButtonPress={() => navigation.navigate(routes.CART)}
            />

            <FlatList
                numColumns={2}
                ListHeaderComponent={() => <View>
                    <BannerViewPager style={styles.banner} onTap={() => {
                        navigation.navigate(routes.LISTINGS);
                    }}/>

                    <View>
                        <Image source={require("../assets/embrowatermark.jpg")} style={styles.waterMarkMedium}/>
                        <Image source={require("../assets/embrowatermark.jpg")} style={styles.waterMarkSmall}/>
                        <Image source={require("../assets/embrowatermark.jpg")} style={styles.waterMarkSmallest}/>
                        <Text style={styles.categoriesLabel}>Categories</Text>

                    </View>
                </View>}
                style={[styles.flatList, {marginBottom: useBottomTabBarHeight()}]}
                data={categories}
                renderItem={({item}) => (
                    <CategoryListItem productImage={require("../assets/redponchobtrans.png")}
                                      title={item.name}
                                    //   colours={item.colours}
                                      onPress={() => navigation.navigate(routes.LISTINGS, {categoryId: item.categoryId})}
                                      numberInList={listings.findIndex((it) => it.key === item.key)}
                    />)} keyExtractor={(listing) => listing.key.toString()}


            />
            <Image source={require("../assets/embrowatermark.jpg")} style={styles.waterMark}/>
            <Image source={require("../assets/embrowatermark.jpg")} style={styles.waterMark}/>
        </View>
    );
}
const styles = StyleSheet.create({
    conatiner: {
        paddingTop: 42,
        flex: 1,
        backgroundColor: colors.white,

    },
    bottom: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
    },
    banner: {
        height: 300,
        backgroundColor: "blue",
        top: 16,
        marginBottom: 12,
    },
    flatList: {
        marginHorizontal: 8,
        elevation: 1,
    },
    header: {
        paddingHorizontal: 28,
        elevation: 1
    },
    categoriesLabel: {

        marginBottom: 8,
        marginTop: 24,
        marginStart: 8,
        fontFamily: "LatoBold",
        color: "#00000019",
        fontSize: 72,
    },
    waterMark: {
        position: "absolute",
        opacity: 0.03,
        width: "40%",
        alignSelf: "center",
        bottom: 0,
    },
    waterMarkMedium: {
        width: 140,
        height: 140,
        start: -20,
        top: 0,
        position: "absolute",
        opacity: 0.09,
        alignSelf: "center",
    },
    waterMarkSmall: {
        width: 80,
        height: 80,
        end: 0,
        bottom: 0,
        position: "absolute",
        opacity: 0.09,
        alignSelf: "center",
    },
    waterMarkSmallest: {
        width: 50,
        height: 50,
        top: 28,
        rotation: 180,
        position: "absolute",
        opacity: 0.09,
        alignSelf: "center",
    },

})
