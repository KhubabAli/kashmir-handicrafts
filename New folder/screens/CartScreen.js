import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useSelector, useDispatch,} from "react-redux";

import Button from "../components/Button";
import colors from "../config/colors";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import Capsule from "../components/Capsule"
import routes from "../navigation/routes";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import {getCartItems, removeItem, incrementItemCount, decrementItemCount, emptyCart} from "../store/cart";
import {useIsFocused} from "@react-navigation/native";

let cartUpdating = false;
export default ({navigation, route}) => {
    console.log("Rendered");
    const dispatch = useDispatch();
    const cartItems = Object.values(useSelector(getCartItems));
    console.log(cartItems.length);
    const [toggle, setToggle] = useState(false);
    const [setCheckStarted] = useState(false);
    const [itemCount, setItemCount] = useState({_id: null, count: 0});
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    let isFocused = useIsFocused();

    const calculatePrice = () => {
        let totalPrice = 0;
        cartItems?.forEach(item => totalPrice += item.price * item.count);
        setTotalPrice(totalPrice);
    }


    const calculateTotalItems = () => {
        let totalItems = 0;
        cartItems?.forEach(item => totalItems += item.count);
        setTotalItems(totalItems);
    }


    useEffect(() => {
        console.log("calculating effect is called");
        calculatePrice();
        calculateTotalItems();
    }, [cartItems])


    const handleRemoveItem = (itemNumber) => {
        dispatch(removeItem(itemNumber));
    }

    const handleIncrement = (itemNumber) => {
        if (!cartUpdating) {
            cartUpdating = true;
            dispatch(incrementItemCount(itemNumber))
        }
    }

    const handleDecrement = (itemNumber) => {
        if (!cartUpdating) {
            cartUpdating = true;
            dispatch(decrementItemCount(itemNumber))
        }
    }

    useEffect(() => {
        setTimeout(() => {
            cartUpdating = false;
        }, 200)
    })

    return (
        <View style={{flex: 1}}>

            {<View style={{paddingTop: 42, paddingHorizontal: 28, flex: 1,}}>
                <Header title="Shopping Cart" leftIcon={"arrow-left"}
                        onLeftButtonPress={() => navigation.goBack()}/>

                <Capsule text={`${totalItems} Items`} style={{marginTop: 12}}/>
                {cartItems && <FlatList
                    style={styles.flatList}
                    data={cartItems}
                    ListHeaderComponent={() => <Button
                        onPress={() => setToggle(!toggle)}
                        iconName={"map-marker-plus-outline"} iconType="materialicons"
                        iconColor={colors.darkGray}
                        textStyle={{color: colors.darkGray, marginStart: 16,}}
                        style={{
                            backgroundColor: colors.secondary,
                            borderRadius: 5,
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            marginBottom: 24,
                            justifyContent: "flex-start"
                        }}
                        title={"Add Delivery Address"}
                    />}
                    renderItem={({item}) => {
                        return (
                            <CartItem
                                renderRightAction={() => (
                                    <ListItemDeleteAction onPress={() => handleRemoveItem(item.itemNumber)}/>
                                )}
                                itemCount={itemCount}
                                setItemCount={setItemCount}
                                count={item.count}
                                key={item.name}
                                _id={item._id}
                                onIncrement={() => handleIncrement(item.itemNumber)}
                                onDecrement={() => handleDecrement(item.itemNumber)}

                                productImage={item.thumbnail}
                                productName={item.name}
                                soldOut={item.soldOut}
                                price={item.price}
                                size={item.size}
                                colour={item.color}
                                onRemove={handleRemoveItem}
                            />)
                    }} keyExtractor={(listing) => listing._id}
                />}
                <View style={{flexDirection: "row", justifyContent: "space-between", paddingVertical: 32}}>
                    <Text style={{fontFamily: "LatoRegular", color: colors.gray, fontSize: 18}}>Total Payment</Text>
                    <Text style={{fontFamily: "LatoBold", color: colors.black, fontSize: 18}}>Rs. {totalPrice}</Text>
                </View>

            </View>}

            {<View style={styles.bottomButtonsContainer}>

                <Button textStyle={{color: colors.primary}}
                        style={{
                            marginStart: 8,
                            borderRadius: 100,
                            paddingVertical: 8,
                            paddingHorizontal: 16
                        }} title={"Continue Shopping"}/>
                <Button textStyle={{color: colors.secondary}}
                        iconColor={colors.secondary} textColor={colors.secondary}
                        style={{
                            backgroundColor: colors.primary,
                            borderRadius: 100,
                            paddingVertical: 14,
                            paddingHorizontal: 16
                        }}
                        onPress={() => goToCheckOut()}
                        title={"Go To Checkout"}

                />
            </View>}
            {!isFocused &&
            <View style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                bottom: 0,
                backgroundColor: '#00000099'
            }}>
            </View>
            }


        </View>

    )

    function goToCheckOut() {
        console.log("Go to checkout is called");
        isFocused = true;
        navigation.navigate(routes.CHECKOUT);
    }

}


const styles = StyleSheet.create(
    {
        flatList: {
            paddingTop: 28
        }
        ,
        bottomButtonsContainer: {
            backgroundColor: colors.white,
            flexDirection: "row", alignItems: "center",
            justifyContent: "center",
            paddingTop: 24,
            paddingBottom: 24,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            elevation: 5
        }
    })