import * as types from "./actionTypes";
import * as cartService from "./../../core/services/cartService";

export function loadCartSuccess(cart) {
    return { type: types.LOAD_CART_SUCCESS, cart };
}

export function addToCartSuccess(cartDetails) {
    return { type: types.ADD_TO_CART_SUCCESS, cartDetails };
}

export function updateCartSuccess(cartDetails) {
    return { type: types.UPDATE_CART_SUCCESS, cartDetails };
}

export function removeDeviceFromCartSuccess(id) {
    return { type: types.REMOVE_DEVICE_FROM_CART_SUCCESS, id};
}

export function loadCartFail() {
    return { type: types.LOAD_CART_FAIL };
}

export function addToCartFail(cartDetails) {
    return { type: types.ADD_TO_CART_FAIL, cartDetails };
}

export function updateCartFail(cartDetails) {
    return { type: types.UPDATE_CART_FAIL, cartDetails };
}

export function removeDeviceFromCartFail() {
    return { type: types.REMOVE_DEVICE_FROM_CART_FAIL };
}

export function clearCart() {
    return { type: types.CLEAR_CART };
}

export function addToCart(cartDetails) {
    return async function (dispatch, getState) {
        try {
            const savedCartDetails = await cartService
                .addDeviceToCart(cartDetails);
            cartDetails.id
                ? dispatch(updateCartSuccess(savedCartDetails))
                : dispatch(addToCartSuccess(savedCartDetails));
        }
        catch (error) {
            cartDetails.id
                ? dispatch(updateCartFail(cartDetails.device.name))
                : dispatch(addToCartFail(cartDetails.device.name));
        }
    };
}

export function loadCart() {
    return function (dispatch) {
        return cartService
            .fetchCart()
            .then(cart => {
                dispatch(loadCartSuccess(cart));
            })
            .catch(error => {
                dispatch(loadCartFail());
            });
    };
}

export function removeDeviceFromCart(id) {
    return function (dispatch) {
        return cartService
            .removeDeviceFromCart(id)
            .then(cart => {
                dispatch(removeDeviceFromCartSuccess(id));
            })
            .catch(error => {
                dispatch(removeDeviceFromCartFail());
            });
    };
}
