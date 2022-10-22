import React from 'react';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ListingsScreen from "../screens/ItemsScreen";
import ListingDetailScreen from "../screens/ItemDetailScreen";
import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import CartScreen from "../screens/CartScreen";

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={"Home"} component={HomeScreen}/>
            <Stack.Screen name={"Listings"} component={ListingsScreen} initialParams={{categoryId: null}}/>
            <Stack.Screen name={"ListingDetail"} component={ListingDetailScreen}
                          options={{
                              tabBarStyle: {
                                  backgroundColor: colors.background,
                                  borderTopWidth: 0,
                                  elevation: 0
                              }
                          }}
            />
        </Stack.Navigator>
    )
}