import colors from "../config/colors";
import {Text, TouchableOpacity} from "react-native";
import React from "react";

export default ({children, style, onPress}) =>
    <TouchableOpacity onPress={() => onPress()}>
        <Text style={[{fontSize: 14, fontFamily: "LatoBold"}, style]}>{children}</Text>
    </TouchableOpacity>
