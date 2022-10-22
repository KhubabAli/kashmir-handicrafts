import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from "react-native";
import * as Yup from 'yup';
import itemsApi from '../api/items'
import categoriesApi from "../api/categories"

import {
    AppFormPicker,
    SubmitButton,
    AppForm,
    AppFormField
} from "../components/forms";
import Screen from "./Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(3).label("Name"),
    price: Yup.number().required().min(1).max(100000).label("Price"),
    description: Yup.string().label("DEscription"),
    category: Yup.object().required().nullable().label("Category"),
    numberInStock: Yup.number().required().min(1).max(1000).label("Number In Stock"),
    color: Yup.string().required().min(4).max(9).label("Color"),
    size: Yup.string().required().min(4).max(50).label("Size"),
    images: Yup.array().min(1, "Please select atleast one image.")
})

export default () => {
    const [categories, setCategories] = useState();
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        loadCategories();
    }, []);


    const loadCategories = async () => {
        const result = await categoriesApi.getCategories();
        setCategories(result.data);
        // console.log("Categories are: ", result.data)
    }

    const handleSubmit = async (item, {resetForm}) => {
        // console.log("Handle Submit is called: " + item.category.catId)
        setProgress(0);
        setUploadVisible(true);
        const result = await itemsApi.addItem(item,
            (progress) => setProgress(progress))

        if (!result.ok) {
            setUploadVisible(false);
            return alert("Could not save the items");
        }
        resetForm();
    }

    return (
        <ScrollView>
            <Screen style={styles.container}>
                <UploadScreen visible={uploadVisible} progress={progress} onDone={() => setUploadVisible(false)}/>
                <AppForm initialValues={{
                    name: "",
                    price: "",
                    description: "",
                    category: null,
                    numberInStock: 0,
                    color: "",
                    size: "",
                    images: [],
                }}
                         onSubmit={handleSubmit}
                         validationSchema={validationSchema}
                >
                    <FormImagePicker name={"images"}/>
                    <AppFormField placeholder={"Name"}
                                  name={"name"}
                                  maxLength={255}
                                  style={{flex: 1}}

                    />

                    <AppFormField keyboardType={"numeric"}
                                  placeholder={"Price"}
                                  name={"price"}
                                  style={{flex: 1}}
                                  maxLength={10}
                                  width={120}
                    />
                    <AppFormField keyboardType={"numeric"}
                                  placeholder={"Number In Stock"}
                                  name={"numberInStock"}
                                  style={{flex: 1}}
                                  maxLength={10}
                                  width={"50%"}
                    />
                    <AppFormPicker items={categories}
                                   name={"category"}
                        // PickerItemComponent={CategoryPickerItem}
                        // numberOfColumns={3}
                                   placeholder={"Categories"}
                                   style={{flex: 1}}
                                   width={"50%"}

                    />
                    <AppFormField placeholder={"Color"}
                                  name={"color"}
                                  maxLength={9}
                                  minLength={4}
                                  style={{flex: 1}}
                                  width={120}

                    />
                    <AppFormField placeholder={"Size"}
                                  name={"size"}
                                  maxLength={9}
                                  minLength={4}
                                  style={{flex: 1}}
                                  width={120}

                    />
                    <AppFormField placeholder={"Description"}
                                  name={"description"}
                                  maxLength={255}
                                  multiline
                                  numberOfLines={3}
                                  style={{flex: 1}}

                    />
                    <SubmitButton title={"Post"}/>
                </AppForm>
            </Screen>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})