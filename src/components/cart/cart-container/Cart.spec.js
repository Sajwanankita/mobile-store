import React from "react";
import { mount } from "enzyme";
import { Cart } from "./Cart";
import UserContext from "../../../provider/UserProvider";

const cart = [{
    id: "id1",
    device: {
        id: "85",
        name: "OPPO Reno 2F",
        modelNumber: "SM-M307FZBGINS",
        colors: ["Red", "Blue"],
        screenSize: "5 inch",
        operatingSystem: "Android 10.0",
        ram: "4 GB",
        storage: "128 GB",
        price: 19999
    },
    quantity: 6
}, {
    id: "id2",
    device: {
        id: "85",
        name: "OPPO 2F",
        modelNumber: "SM-M307FZBGINS",
        colors: ["Red", "Blue"],
        screenSize: "5 inch",
        operatingSystem: "Android 10.0",
        ram: "4 GB",
        storage: "128 GB",
        price: 19999
    },
    quantity: 6
}];

function render(args) {
    const defaultProps = {
        loadCart: jest.fn(() => Promise.resolve([])),
        addToCart: jest.fn(),
        removeDeviceFromCart: jest.fn(),
        cart: cart
    };
    const props = { ...defaultProps, ...args };
    return mount(
        <UserContext.Provider value="mock">
            <Cart {...props} />
        </UserContext.Provider>
    );
}

function renderForEmptyCart(args) {
    const defaultProps = {
        loadCart: jest.fn(() => Promise.resolve([])),
        addToCart: jest.fn(),
        removeDeviceFromCart: jest.fn(),
        cart: []
    };
    const props = { ...defaultProps, ...args };
    return mount(
        <UserContext.Provider value="mock">
            <Cart {...props} />
        </UserContext.Provider>
    );
}


describe("Cart", () => {
    it('should show empty message when cart is empty', () => {
        const wrapper = renderForEmptyCart();
        const emptyMessage = wrapper.find('.empty-message');
        expect(emptyMessage.exists()).toBe(true);
    });

    it('should show cart details when not empty', () => {
        const wrapper = render();
        const cartTitle = wrapper.find('h3').first();
        expect(cartTitle.text()).toEqual("Cart Details");
        expect(cartTitle.exists()).toBe(true);
    });

    it('should render two cart details on cart page', () => {
        const wrapper = render();
        const cartDetails = wrapper.find('CartDetails')
        expect(cartDetails).toHaveLength(2);
    });


    it('should show total items with total price', () => {
        const wrapper = render();
        const cartDetails = wrapper.find('.price').first();
        expect(cartDetails.text()).toBe("Sub Total (12) device(s) :  ₹  239988   ")
    });

});