import React from 'react';
import Button from "../Button";
import {StyleSheet} from "react-native";
import {useFormikContext} from "formik";

import colors from "../../config/colors";


export default ({title}) => {
    const {handleSubmit} = useFormikContext();
    return (
        <Button
            title={title}
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={handleSubmit}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        height: 50,
        marginTop: 48,
        width: "100%",
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
    },
})