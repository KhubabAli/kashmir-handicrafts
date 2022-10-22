import React from 'react';
import Button from "./Button";
import PageIndicator from "./PageIndicator";
import {StyleSheet, View} from "react-native";

export default ({style, selectedPage, totalPages, switchLeft, switchRight}) => <View
    style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        ...style
    }}>
    <Button style={styles.button} iconName="chevron-left" onPress={() => switchLeft()}/>
    <PageIndicator selectedPage={selectedPage} totalPages={totalPages}/>
    <Button style={styles.button} iconName="chevron-right" onPress={() => switchRight()}/>
</View>

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        borderRadius: 50,
        padding: 8,
    }
})