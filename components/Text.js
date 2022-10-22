import React from "react";

import defaultStyles from "../config/styles"
import {Text} from "react-native";

export default ({children, style}) => {
    return (
        <Text style={[defaultStyles.text, style]}>{children}</Text>
    )
}