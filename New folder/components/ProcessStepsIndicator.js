import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import colors from "../config/colors";

export default ({currentStep, steps, style}) => {
    console.log(steps)
    return (
        <View style={[styles.container, style]}>
            {
                steps.map((step) => (
                    <View style={[styles.indicator]}>
                        <View
                            style={[styles.bar, currentStep >= step.number && {backgroundColor: colors.highlighter}]}/>
                        <View
                            style={[styles.dot, currentStep >= step.number && {backgroundColor: colors.highlighter}]}/>
                        <Text style={[{
                            position: "absolute",
                            top: 16,
                            end: 0,
                            alignSelf: "center",
                            fontFamily: "LatoLight",
                            color: colors.darkGray,
                            paddingTop: 0,
                            fontSize: 11
                        }, currentStep === step.number && {fontSize: 18, fontFamily: "LatoBold"}]}>{step.name}</Text>

                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        direction: "ltr",
        flexDirection: "row",
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: colors.gray,
        elevation: 1,
        marginStart: -2,
    },
    bar: {
        flex: 1,
        height: 3,
        backgroundColor: colors.gray,
        marginStart: -2
    },
    indicator: {
        alignItems: "center",
        width: "33%",
        flex: 1,
        flexDirection: "row"
    }

})
