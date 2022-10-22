import AppLoading from "expo-app-loading";
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import configureStore from "./store/configureStore";
import {useFonts} from 'expo-font';
import {useState} from "react"; 

import AuthContext from "./auth/contex";
import authStorage from "./auth/storage";
import CartContext from "./cart/context";
import cartApi from "./api/cart";

import navigationTheme from "./navigation/navigationTheme";
import OfflineNotice from "./components/OfflineNotice";
import {persistStore} from "redux-persist";
import MainNavigator from "./navigation/MainNavigator";

const store = configureStore();
const persistor = persistStore(store);
export default function App() {
    // return null;
    const [fontsLoaded] = useFonts({
        LatoRegular: require("./assets/fonts/lato/Lato-Regular.ttf"),
        LatoBold: require("./assets/fonts/lato/Lato-Bold.ttf"),
        LatoBlack: require("./assets/fonts/lato/Lato-Black.ttf"),
        LatoLight: require("./assets/fonts/lato/Lato-Light.ttf"),
        LatoMedium: require("./assets/fonts/lato/Lato-Medium.ttf"),
    })
    const [isReady, setIsReady] = useState(false);
    const [user, setUser] = useState();
    const [cartItems, setCartItems] = useState([]);

    const restoreUser = async () => {
        const user = await authStorage.getUser();
        setUser(user);
        await loadCart();
    }

    const loadCart = async () => {
        const cartItems = await cartApi.getCartItems();
        setCartItems(cartItems);
    }

    if (!isReady)
        return (
            <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)}
                        onError={() => console.log("Error Loading App")}/>
        );

    return !fontsLoaded ? null : (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AuthContext.Provider value={{user, setUser}}>
                    <CartContext.Provider value={{cartItems, setCartItems}}>
                        <OfflineNotice/>

                        <NavigationContainer theme={navigationTheme}>
                            <MainNavigator/>
                        </NavigationContainer>
                    </CartContext.Provider>
                </AuthContext.Provider>
            </PersistGate>
        </Provider>

    );
}
