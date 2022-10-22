import React from 'react';
import {useFormikContext} from "formik";

import AppPicker from '../AppPicker';

// import AppPicker from "../../../../Bus-App/BusApp/components/AppPicker";
import ErrorMessage from "./ErrorMessage";

export default ({items, PickerItemComponent, placeholder, name, numberOfColumns, width}) => {
    const {errors, setFieldValue, touched, values} = useFormikContext();
    return (
        <>
            <AppPicker icon={"apps"}
                       items={items}
                       numberOfcolumns={numberOfColumns}
                       PickerItemComponent={PickerItemComponent}
                       placeholder={placeholder}
                       selectedItem={values[name]}
                       onSelectItem={(item) => setFieldValue(name, item)}
                       width={width}
            />

            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    )
}