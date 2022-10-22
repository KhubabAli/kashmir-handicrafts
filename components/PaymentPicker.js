import React from "react";
import PaymentPickerItem from "./PaymentPickerItem";
import {View} from "react-native";

export default ({items, pickedItem, style, onPress}) => {
    return (
        <View style={style}>
            {
                items.map((item) => (
                    <PaymentPickerItem item={item} onPress={onPress} pickedItem={pickedItem}/>
                ))
            }
        </View>
    )
}