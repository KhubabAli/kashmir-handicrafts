import {combineReducers} from "redux";
import cartReducer from "./cart";
import addressBookReducer from "./addressBook";
import filterReducer from "./filter"
import userReducer from "./user"

export default combineReducers({
    addressBook: addressBookReducer,
    cart: cartReducer,
    filter: filterReducer,
    user: userReducer,
})