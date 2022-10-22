import React from "react";
import {View} from "react-native";
import Shimmer from './Shimmer';

export default () => {
    return (
        <View style={{width: 100, height: 100, flex: 1}}>
            <Shimmer width={100} height={100}/>
        </View>
    );
};