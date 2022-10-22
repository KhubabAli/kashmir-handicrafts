import * as Yup from 'yup';
import jwtDecode from "jwt-decode";
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from "react-native";
import {} from '@react-navigation/bottom-tabs'

import Screen from './Screen';
import {AppForm, AppFormField, ErrorMessage, SubmitButton} from "../components/forms"

import authApi from "../api/auth";
import AuthContext from "../auth/contex";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
    phone: Yup.string().required().label("Phone").min(11),
    password: Yup.string().required().min(4).label("Password")
})

export default ({navigation}) => {
    useEffect(() => {
        navigation.getParent()?.setOptions({tabBarStyle: {display: "none"}});
        return () => navigation.getParent()?.setOptions({tabBarStyle: undefined});
    }, [navigation]);

    const authContext = useContext(AuthContext);
    const [loginFailed, setLoginFailed] = useState(false);

    const handleSubmit = async ({phone, password}) => {
        const result = await authApi.login(phone, password);
        if (!result.ok) return setLoginFailed(true);

        setLoginFailed(false);

        const user = jwtDecode(result.data);
        authContext.setUser(user);
        authStorage.storeToken(result.data);
        navigation.goBack();
    }

    return (
        <Screen style={styles.container}>
            <AppForm initialValues={{phone: "", password: ""}}
                     onSubmit={handleSubmit}
                     validationSchema={validationSchema}>
                <ErrorMessage error={"Invalid phone or password"} visible={loginFailed}/>
                <AppFormField
                    autoCorrect={false}
                    autoCapitalize="none"
                    icon={"phone"}
                    name={"phone"}
                    keyboardType="numeric"
                    placeholder={"Phone"}
                    style={{flex: 1}}
                />
                <AppFormField
                    autoCorrect={false}
                    autoCapitalize="none"
                    icon={"lock"}
                    name={"password"}
                    placeholder={"Password"}
                    secureTextEntry
                    style={{flex: 1}}
                />
                <SubmitButton title={"Login"}/>
            </AppForm>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingTop: 200,
    }
})