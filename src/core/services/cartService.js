import { handleResponse, handleError } from "./apiUtils";

const baseUrl = "http://localhost:3001/cart/";

export function addDeviceToCart(cartDetails) {
    return fetch(baseUrl + (cartDetails.id || ""), {
        method: cartDetails.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(cartDetails)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function fetchCart() {
    return fetch(baseUrl)
        .then(handleResponse)
        .catch(handleError);
}

export function removeDeviceFromCart(id) {
    return fetch(baseUrl + (id), {
        method: "DELETE",
        headers: { "content-type": "application/json" }
    })
        .then(handleResponse)
        .catch(handleError);
}
