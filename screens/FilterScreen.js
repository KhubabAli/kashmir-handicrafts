import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Chip} from "@rneui/themed"

import colors from "../config/colors";
import Screen from "./Screen";

import {
    getFilter,
    switchCategorySelected,
    switchSizeSelected,
    switchColorSelected,
    setFilterApplied,
    setPrice,
} from "../store/filter";
import {Icon} from "react-native-elements";
import Text from "../components/Text";
import Header from "../components/Header";
import Button from "../components/Button";
import RangeSlider from "../components/RangeSlider";


export default ({navigation}) => {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);

    const [minimumPrice, setMinimumPrice] = useState(filter.priceRange.min);
    const [maximumPrice, setMaximumPrice] = useState(filter.priceRange.max);

    const [categories, setCategories] = useState();
    const [colours, setColours] = useState();
    const [sizes, setSizes] = useState();

    useEffect(() => {
        setColours(filter.colors);
        setCategories(filter.categories);
        setSizes(filter.sizes);
    }, [filter]);


    const handleFiltersCleared = () => {

        dispatch(setFilterApplied(false));
        navigation.goBack();
    }

    const applyFilter = () => {
        dispatch(setPrice(minimumPrice, maximumPrice));
        dispatch(setFilterApplied(true));
        navigation.goBack();
    }


    const handleCategorySelected = (id) => {
        dispatch(switchCategorySelected(id))
    }

    const handleColorSelected = (id) => {
        dispatch(switchColorSelected(id));
    }

    const handleSizeSelected = (id) => {
        dispatch(switchSizeSelected(id));
    }

    return (
        <Screen>

            <View style={styles.container}>

                <View style={styles.subContainer}>
                    <Header title="Filter"
                            onLeftButtonPress={() => navigation.goBack()}
                            style={{flex: 0.4}}/>
                    <View style={{flex: 8}}>
                        <ScrollView>
                            <View>
                                <View style={styles.itemContainer}>
                                    <View style={styles.topContainer}>
                                        <Text>Price Range</Text>
                                        <View style={styles.priceRangeContainer}>
                                            <Text>Rs. {minimumPrice}</Text>
                                            <Text> Rs. {maximumPrice}</Text>
                                        </View>
                                    </View>
                                    <RangeSlider
                                        onValueChanged={(min, max) => {
                                            setMaximumPrice(max);
                                            setMinimumPrice(min);
                                        }}
                                        selectedMin={filter.priceRange.min}
                                        selectedMax={filter.priceRange.max}
                                        max={100000}
                                        step={500}
                                    />


                                </View>
                                <View style={styles.itemContainer}>
                                    <View style={styles.topContainer}>
                                        <Text>Categories</Text>
                                    </View>
                                    <View style={{flexDirection: "row", flexWrap: "wrap", width: "100%"}}>
                                        {
                                            categories?.map(item => {
                                                return (
                                                    <TouchableWithoutFeedback key={item.id}
                                                                              onPress={() => handleCategorySelected(item.id)}>
                                                        <View
                                                            style={[item.selected ? {backgroundColor: colors.primary} : {backgroundColor: "lightgray"},
                                                                styles.chip
                                                            ]}>
                                                            <Text
                                                                style={[styles.text, item.selected ? {color: colors.white} : {color: colors.lightGray}]}>{item.name}</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )
                                            })
                                        }
                                    </View>
                                </View>

                                <View style={styles.itemContainer}>
                                    <View style={styles.topContainer}>
                                        <Text>Colors</Text>
                                    </View>
                                    <View style={{flexDirection: "row", flexWrap: "wrap", width: "100%"}}>
                                        {
                                            colours?.map(color => {
                                                return (
                                                    <TouchableWithoutFeedback key={color.id}
                                                                              onPress={() => handleColorSelected(color.id)}>
                                                        <View
                                                            style={[color.selected ? {borderWidth: 3} : {
                                                                borderWidth: 0
                                                            },
                                                                {
                                                                    ...styles.chip,
                                                                    backgroundColor: color.name,
                                                                }
                                                            ]}>
                                                            <Text style={styles.text}>{color.name}</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )
                                            })
                                        }
                                    </View>
                                </View>

                                <View style={styles.itemContainer}>
                                    <View style={styles.topContainer}>
                                        <Text>Sizes</Text>
                                    </View>
                                    <View style={{flexDirection: "row", flexWrap: "wrap", width: "100%"}}>
                                        {
                                            sizes?.map(size => {
                                                return (
                                                    <TouchableWithoutFeedback key={size.id}
                                                                              onPress={() => handleSizeSelected(size.id)}>
                                                        <View
                                                            style={[size.selected ? {backgroundColor: colors.primary} : {
                                                                backgroundColor: "lightgray"
                                                            },
                                                                styles.chip
                                                            ]}>
                                                            <Text
                                                                style={[styles.text, size.selected ? {color: colors.white} : {color: colors.lightGray}]}>{size.name}</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        flex: 1,
                        alignItems: "center"
                    }}>
                        <Button textStyle={{color: colors.primary}}
                                onPress={handleFiltersCleared}
                                style={{
                                    marginStart: 8,
                                    borderRadius: 100,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16
                                }}
                                title={"Clear Filters"}
                        />
                        <Button textStyle={{color: colors.white, paddingHorizontal: 16}}
                                iconColor={colors.secondary} textColor={colors.secondary}
                                style={{
                                    backgroundColor: "black",
                                    borderRadius: 100,
                                    height: 50,
                                    paddingVertical: 14,
                                    paddingHorizontal: 16
                                }}
                                onPress={applyFilter}
                                title={"Apply"}
                        />
                    </View>
                </View>
            </View>
        </Screen>
    )

}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        bottom: 0,
        justifyContent: "flex-end",
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
        overflow: "hidden",
        left: 0,
        right: 0,


    },
    subContainer: {
        flexGrow: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        borderRadius: 5,
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingTop: 24,

    },
    processStepIndicator: {},

    itemContainer: {
        borderColor: colors.lightGray,
        borderWidth: 1.5,
        borderRadius: 4,
        marginTop: 16,
        paddingVertical: 14,
        overflow: "hidden",
        paddingHorizontal: 16,
        paddingEnd: 24
    },
    priceRangeContainer: {
        flexDirection: "row"
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
    },
    chip: {
        margin: 4, padding: 10, borderRadius: 100
    }

})