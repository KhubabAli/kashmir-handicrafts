import {ScrollView, StyleSheet, View} from "react-native";
import Text from "../Text";
import {AppForm, AppFormField, SubmitButton} from "./index";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name").min(3),
    lastName: Yup.string().required().label("Last Name").min(3),
    phone: Yup.string().required().label("Phone").min(11),
    streetAddress: Yup.string().required().label("Street Address").min(3),
    addressLine2: Yup.string().label("Address Line 2"),
    country: Yup.string().required().label("Country").min(2),
    state: Yup.string().required().label("State").min(2),
    city: Yup.string().required().label("City").min(2),
    postalCode: Yup.string().required().label("Postal Code").min(2),
})


export default ({handleSubmit}) => {
    return (
        <>
            <ScrollView style={{flex: 1}}>
                <View>
                    <Text style={styles.title}>Add address</Text>
                    <View style={{paddingTop: 12}}>
                        <AppForm initialValues={{
                            firstName: "",
                            lastName: "",
                            phone: "",
                            streetAddress: "",
                            addressLine2: "",
                            country: "",
                            state: "",
                            city: "",
                            postalCode: ""
                        }} validationSchema={validationSchema}
                                 onSubmit={handleSubmit}
                        >
                            <AppFormField
                                autoCorrect={false}
                                name={"firstName"}
                                flex={1}

                                placeholder={"First Name*"}
                            />
                            <AppFormField
                                autoCorrect={false}
                                name={"lastName"}
                                flex={1}

                                placeholder={"Last Name*"}
                            />
                            <AppFormField
                                autoCorrect={false}
                                name={"phone"}
                                flex={1}
                                width={"70%"}
                                keyboardType={"numeric"}
                                placeholder={"Phone Number*"}
                            />
                            <AppFormField
                                autoCorrect={false}
                                name={"streetAddress"}
                                flex={1}

                                placeholder={"Street Address*"}
                            />
                            <AppFormField
                                autoCorrect={false}
                                name={"addressLine2"}
                                flex={1}

                                placeholder={"Address Line 2"}
                            />
                            <AppFormField
                                autoCorrect={false}
                                name={"country"}
                                flex={1}
                                width={"70%"}

                                placeholder={"Country*"}
                            />
                            <AppFormField
                                autoCorrect={false}
                                name={"state"}
                                flex={1}
                                width={"50%"}

                                placeholder={"State/Province*"}
                            />
                            <AppFormField
                                autoCorrect={false}
                                name={"city"}
                                placeholder={"City*"}
                                width={"50%"}
                                flex={1}
                            />
                            <AppFormField
                                autoCorrect={false}
                                name={"postalCode"}
                                placeholder={"Zip/Postal Code*"}
                                flex={1}
                                width={"50%"}
                            />
                            <SubmitButton title={"Add Address"}/>
                        </AppForm>
                    </View>
                    {/*<Address name={"Fatima Raja"}*/}
                    {/*         address={"AlKhidmat General Store Chella Bandi"}*/}
                    {/*         city={"Muzaffarabad"}*/}
                    {/*         zip={13100} phone={"03475932761"}*/}
                    {/*         style={{marginTop: 64}}/>*/}

                    {/*<Button*/}
                    {/*    style={{*/}
                    {/*        backgroundColor: colors.primaryLight,*/}
                    {/*        borderRadius: 5,*/}
                    {/*        paddingVertical: 8,*/}
                    {/*        marginTop: 12*/}
                    {/*    }}*/}
                    {/*    textStyle={{*/}
                    {/*        color: colors.white*/}
                    {/*    }}*/}
                    {/*    title={"Add or Change Address"}*/}
                    {/*/>*/}
                </View>
            </ScrollView>
        </>
    )
}
const styles = StyleSheet.create({
    container: {},
    title: {
        marginTop: 8,
        marginBottom: 4,
        fontFamily: "LatoBold"
    }
})