import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { toast } from "react-toastify";

export default function cartReducer(state = initialState.cart, action) {
    switch (action.type) {
        case types.LOAD_CART_SUCCESS:
            return action.cart;
        case types.ADD_TO_CART_SUCCESS:
            toast.success("Device added to cart successfully");
            return [...state, { ...action.cartDetails }];
        case types.REMOVE_DEVICE_FROM_CART_SUCCESS:
            return [...state].filter(cartDetail => cartDetail.id !== action.id);
        case types.UPDATE_CART_SUCCESS:
            toast.success("Cart updated successfully");
            return [...state].map(cartDetails =>
                cartDetails.id === action.cartDetails.id ? action.cartDetails : cartDetails
            );
        case types.LOAD_CART_FAIL:
            toast.error("Error in loading cart");
            return state;
        case types.ADD_TO_CART_FAIL:
            toast.error("Error in updating quantity of to cart");
            return state;
        case types.REMOVE_DEVICE_FROM_CART_FAIL:
            return state;
        case types.UPDATE_CART_FAIL:
            toast.error("Error in updating quantity of to cart");
            return state;
        case types.CLEAR_CART:
            console.log("clear...............");
            state = initialState.cart;
            return state;
        default:
            return state;
    }
}
