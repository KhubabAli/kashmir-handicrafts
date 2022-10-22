import React from 'react';
import {useFormikContext} from 'formik'

import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import Text from "../Text";
import {View} from "react-native";
import colors from "../../config/colors";

export default ({name, width, ...otherProps}) => {
    const {setFieldTouched, handleChange, errors, touched, setFieldValue, values} = useFormikContext();
    return (
        <View>
            {values[name].length > 0 && <Text style={{
                color: colors.darkGray, marginBottom: -4,
            }}>{otherProps.placeholder}</Text>}
            <AppTextInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={text => setFieldValue(name, text)}
                value={values[name]}
                width={width}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </View>
    )
}
