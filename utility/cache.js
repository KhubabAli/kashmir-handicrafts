import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';

const prefix = 'cache';
const expiryInMinutes = 5;

const store = async (key, value) => {

    ``
    const item = {
        value: value,
        timestamp: Date.now()
    }
    try {
        await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
    } catch (error) {
        console.log(error);
    }
}

const isExpired = (item) => {
    const now = moment(Date.now());
    const storedTime = moment(item.timestamp);
    return now.diff(storedTime, 'minutes') > expiryInMinutes;
}

const get = async (key, expireable = true) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key);
        const item = JSON.parse(value);
        if (!item) return null;


        if (expireable && isExpired(item)) {
            await AsyncStorage.removeItem(prefix + key);
            return null;
        }

        return item.value;
    } catch (e) {
        console.log(e);
    }
}

export default {
    store,
    get,
}


