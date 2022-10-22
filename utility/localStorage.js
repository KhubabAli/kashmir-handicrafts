import AsyncStorage from "@react-native-async-storage/async-storage";

const prefix = 'localStorage';

const store = async (key, value) => {
    const item = {
        value: value,
        timestamp: Date.now()
    }
    try {
        await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(value);
        if (!item) return null;

        return item.value;
    } catch (e) {
        console.log(e);
    }
}

export default {
    store,
    get,
}


