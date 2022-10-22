import {Text} from "react-native";
import colors from "../config/colors";
import React from "react";

export default ({text, style}) => {
    const array = text.split(/kashmiri/);
    return <Text style={style}>
        {array[0]} {array.length > 1 && <Text style={{color: colors.primary}}>{"kashmiri"}</Text>} {array[1]}
    </Text>
}