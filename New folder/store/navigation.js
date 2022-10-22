import {combineReducers} from "redux";
import checkoutNavReducer from "./checkoutNav";

export default combineReducers({
    checkoutNav: checkoutNavReducer,
})