import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, FlatList} from "react-native";
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from "react-redux";


import itemsApi from "../api/items";
import ProductListItem from "../components/ProductListItem";
import routes from "../navigation/routes";
import Header from "../components/Header";
import colors from "../config/colors";
import LottieView from "lottie-react-native";
import _ from "lodash";
import {addItem} from "../store/cart";
import {getAppliedFilter, getFilterApplied} from "../store/filter";


let page = 1;
let itemsLoading = false;
export default ({navigation, route}) => {
    const {categoryId} = route.params;
    console.log(`Selected Category is: ${categoryId}`);

    const dispatch = useDispatch();
    const appliedFilter = useSelector(getAppliedFilter);
    const isFilterApplied = useSelector(getFilterApplied);

    const [items, setItems] = useState([]);
    // const category = route.params?.category;
    const [loadingItems, setLoadingItems] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        console.log("Use Effect is called");
        console.log("filterApplied", appliedFilter);
        if (appliedFilter?.filterApplied) applyFilter();
        else loadItems();
        return (() => page = 1);
    }, []);


    useEffect(() => {
        applyFilter();
    }, [isFilterApplied, appliedFilter])


    const handleEndReached = () => {
        loadItems();
    }

    const configureFilter = () => {
        if (!appliedFilter) return

        let selectedCategories = "";
        let selectedColors = "";
        let selectedSizes = "";

        appliedFilter.categories.forEach(category => selectedCategories += `,${category.name}`);
        appliedFilter.colors.forEach(color => selectedColors += `,${color.name}`);
        appliedFilter.sizes.forEach(size => selectedSizes += `,${size.name}`);

        return {
            maxPrice: appliedFilter.priceRange.max,
            minPrice: appliedFilter.priceRange.min,
            selectedCategories,
            selectedColors,
            selectedSizes,
        }
    }

    const applyFilter = async () => {
        setItems([]);
        loadItems(true);
    }

    const loadItems = async (reset = false) => {
        if (itemsLoading) return;
        itemsLoading = true;

        setLoadingItems(true);

        if (reset) page = 1;
        const response = await itemsApi.getItems(page, configureFilter());
        if (response.ok) {
            if (reset) setItems([...response.data])
            else setItems([...items, ...response.data,]);
            if (response.data.length > 0) {
                page = page + 1;
            }
        }
        setLoadingItems(false);
        itemsLoading = false;
    }


    const refreshItems = async () => {
        setRefreshing(true);
        await loadItems(true);
        setRefreshing(false);
    }

    const addToCart = (item) => {
        const newItem = {
            ..._.pick(item, ["thumbnail", "name", "price", "_id", "color"]),
            count: 1
        }
        dispatch(addItem(newItem));
    }

    return (
        <View style={[styles.container, {paddingBottom: useBottomTabBarHeight()}]}>
            <Header title="Kashmir Handicrafts" leftIcon={"arrow-left"} rightIcon={"filter"}
                    onLeftButtonPress={() => navigation.navigate(routes.HOME)}
                    onRightButtonPress={() => navigation.navigate(routes.FILTER)}
            />
            <FlatList
                onEndReached={({distanceFromEnd}) => {
                    if (distanceFromEnd < 0) return;
                    handleEndReached();
                }}
                onRefresh={async () => {
                    refreshItems();
                }}
                refreshing={refreshing}
                ListFooterComponent={() =>
                    <View style={styles.animationContainer}>
                        {loadingItems && <LottieView source={require("../assets/loading_items.json")}
                                                     style={styles.loadingAnimation}
                                                     autoPlay
                        />}
                    </View>
                }
                style={[styles.flatList,]}
                data={categoryId ? items.filter((item) => item.categoryId === categoryId) : items} numColumns={2}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                        <ProductListItem thumbnail={item.thumbnailHigh}
                                         key={item._id}
                                         productName={item.name}
                                         soldOut={item.soldOut}
                                         price={item.price}
                                         color={item.color}
                                         onPress={() => navigation.navigate(routes.LISTING_DETAIL, {itemId: item._id})}
                                         onAddToCart={() => addToCart(item)}
                        />)
                }}


            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 42,
        paddingHorizontal: 8,
        flex: 1,
        backgroundColor: colors.white

    },
    flatList: {
        marginTop: 24,
    },
    loadingAnimation: {
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center"
    },
    animationContainer: {
        alignItems: "center"
    }
})