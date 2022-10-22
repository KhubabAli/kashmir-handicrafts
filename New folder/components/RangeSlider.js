import RangeSlider from 'rn-range-slider';
import {View, StyleSheet} from "react-native";
import Text from "./Text";
import React from "react";
import colors from "../config/colors";

export default ({
                    style,
                    onValueChanged,
                    min = 0,
                    max = 100,
                    step = 1,
                    selectedMin = 0,
                    selectedMax = 100,
                }) => {

    const renderThumb = () => (<View style={styles.thumb}/>)
    const renderRail = () => {
        return (
            <View style={styles.rail}/>
        )
    }
    const renderRailSelected = () => {
        return (
            <View style={styles.railSelected}/>
        )
    }
    const renderLabel = () => {
        return (
            <View style={styles.label}/>
        )
    }
    const renderNotch = () => {
        return (
            <View style={styles.notch}/>
        )
    }
    const handleValueChanged = (min, max) => {
        onValueChanged(min, max);
    }


    return (
        <View style={[{flexDirection: "row", width: "100%"}, style]}>
            <RangeSlider
                style={{width: "100%"}}
                min={min}
                max={max}
                step={step}
                floatingLabel
                renderThumb={renderThumb}
                renderRail={renderRail}
                renderRailSelected={renderRailSelected}
                renderLabel={renderLabel}
                renderNotch={renderNotch}
                onValueChanged={handleValueChanged}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    thumb: {
        width: 16,
        height: 16,
        borderRadius: 24,
        backgroundColor: colors.primary

    },
    railSelected: {
        width: "100%",
        height: 4,
        backgroundColor: colors.primary
    },
    label: {},
    notch: {},
    rail: {
        width: "100%",
        height: 3,
        backgroundColor: colors.gray
    }
})