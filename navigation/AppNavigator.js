import React, {useState} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useSelector} from "react-redux";

import {getCartItemsCount} from "../store/cart";
import HomeNavigator from "./HomeNavigator";
import colors from "../config/colors";
import CartNavigator from "./CartNavigator";
import ListingEditScreen from "../screens/ItemEditScreen";
import ProfileNavigator from "./ProfileNavigator";
import IconWithBadge from "../components/IconWithBadge";

const Tab = createBottomTabNavigator();

export default () => {
    const cartItemsCount = useSelector(getCartItemsCount);

    return (
        <>
            <Tab.Navigator screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.white,
                    borderTopWidth: 0,
                    elevation: 12,
                    borderRadius: 50,
                    position: "absolute"
                },
            }}>

                <Tab.Screen name={"Home"} component={HomeNavigator} options={{
                    tabBarIcon: ({size, color}) => (
                        <MaterialCommunityIcons name="home" size={size} color={color}/>
                    )
                }}/>

                <Tab.Screen name={"Profile"} component={ProfileNavigator} options={{
                    tabBarIcon: ({size, color}) => (
                        <MaterialCommunityIcons name="account" size={size} color={color}/>
                    )
                }}/>

                <Tab.Screen name={"Cart"} component={CartNavigator} options={{

                    tabBarIcon: ({size, color}) => (
                        <IconWithBadge name="cart"
                                       size={size}
                                       color={color}
                                       badgeCount={cartItemsCount}/>
                    ),
                    tabBarStyle: {
                        backgroundColor: colors.white,
                        borderTopWidth: 0,
                        elevation: 0
                    }
                }}/>

                <Tab.Screen name={"New Listing"} component={ListingEditScreen} options={{
                    tabBarIcon: ({size, color}) => (
                        <MaterialCommunityIcons name="plus" size={size} color={color}/>
                    ),
                    tabBarStyle: {
                        backgroundColor: colors.white,
                        borderTopWidth: 0,
                        elevation: 0
                    }
                }}/>
            </Tab.Navigator>
        </>
    )
}