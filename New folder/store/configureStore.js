import {configureStore} from "@reduxjs/toolkit";
import ExpoFileSystemsStorage from "redux-persist-expo-filesystem";
import {persistReducer, persistStore} from "redux-persist";
import reducer from "./reducer";

export default function () {

    const persistConfig = {
        key: 'root',
        storage: ExpoFileSystemsStorage
    }
    const persistedReducer = persistReducer(
        persistConfig,
        reducer
    )

    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({
            immutableCheck: {ignoredPaths: ['entities']},
            serializableCheck: {ignoredPaths: ['entities']}
        })]

    });


}