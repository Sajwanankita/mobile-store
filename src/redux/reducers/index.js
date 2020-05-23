import { combineReducers } from "redux";
import devices from "./deviceReducer";
import cart from "./cartReducers";

const rootReducers = combineReducers(
    {
        devices,
        cart
    }
);

export default rootReducers;