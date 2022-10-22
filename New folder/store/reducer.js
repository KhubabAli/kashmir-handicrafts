import {combineReducers} from "redux";
import entitiesReducer from "./entities";
import navigationReducer from "./navigation";

export default combineReducers({
    entities: entitiesReducer,
    navigation: navigationReducer,
})