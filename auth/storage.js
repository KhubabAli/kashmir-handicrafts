import * as SecureStore from 'expo-secure-store';
import jwtDecode from "jwt-decode";

const key = "authToken";

const storeToken = async authToken => {
    try {
        await SecureStore.setItemAsync(key, authToken);
    } catch (e) {
        console.log("Error storing the auth Token.", e);
    }
}

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (e) {
        console.log("Error Getting the auth Token.", e);
    }
}

const getUser = async () => {
    const token = await getToken();

    return (token) ? jwtDecode(token) : null;
}

const removeToken = async () => {
    try {
        return await SecureStore.deleteItemAsync(key);
    } catch (e) {
        console.log(e);
    }
}

export default {storeToken, getUser, removeToken};