import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";

import {View, StyleSheet, FlatList,} from "react-native";
import Text from "../Text";
import Button from "../Button";
import colors from "../../config/colors";
import CheckoutListItem from "../CheckoutListItem";
import AddressItem from "../AddressItem";


export default ({
                    onPress,
                    addresses,
                    selectedAddress,
                    selectAddress,
                    title
                }) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <Button
                title={"Add New Address"}
                iconName={"plus-circle-outline"}
                iconColor={colors.black}
                style={{
                    marginTop: 24,
                    borderWidth: 1.5,
                    borderColor: colors.lightGray,
                    borderRadius: 4,
                    paddingVertical: 6,
                }}
                onPress={onPress}
            />
            <FlatList data={addresses}
                      renderItem={({item}) => <CheckoutListItem
                          item={item}
                          selectedItem={selectedAddress}
                          selectItem={selectAddress}
                          key={item.id}
                          ItemComponent={AddressItem}
                      />}
                      keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 32,
        fontFamily: "LatoBold"
    }
})

