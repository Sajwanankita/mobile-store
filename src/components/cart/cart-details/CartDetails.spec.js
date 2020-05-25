import { shallow } from "enzyme/build";
import React from "react";
import { mount } from "enzyme";
import { carts } from "./../../../../tools/mockData";
import { CartDetails } from "./CartDetails";

const cartDetails = {
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
};

function render(args) {
    const defaultProps = {
        cartDetails: cartDetails,
        carts,
        history: {},
        onUpdateQuantity: jest.fn()
    };

    const props = { ...defaultProps, ...args };

    return mount(<CartDetails {...props} />);
}

it('should have a search box', () => {
    const searchWrapper = render();
    const searchBox = searchWrapper.find('#quantity');
    expect(searchBox.exists()).toBe(true);
});

it('should be able to take input from user', () => {

    let onInputCallCount = 0;
    const mockOnUpdateQuantity = () => {
        onInputCallCount++;
    };
    const searchWrapper = shallow((<CartDetails cartDetails={cartDetails} onUpdateQuantity={mockOnUpdateQuantity}>Ok!</CartDetails>));
    const searchBox = searchWrapper.find('#update-button');

    searchBox.simulate('click');
    expect(onInputCallCount).toEqual(1);
});

it('should be able to take input from user', () => {

    let onInputCallCount = 0;
    const handleIncrementDevice = () => {
        onInputCallCount++;
    };
    const searchWrapper = shallow((<CartDetails cartDetails={cartDetails} onIncrementDevice={handleIncrementDevice}>Ok!</CartDetails>));
    const searchBox = searchWrapper.find('.plus');

    searchBox.simulate('click');
    expect(onInputCallCount).toEqual(1);
});

it('should be able to take input from user', () => {

    let onInputCallCount = 0;
    const handleDecrementDevice = () => {
        onInputCallCount++;
    };
    const searchWrapper = shallow((<CartDetails cartDetails={cartDetails} onDecrementDevice={handleDecrementDevice}>Ok!</CartDetails>));
    const searchBox = searchWrapper.find('.minus');
    searchBox.simulate('click');
    expect(onInputCallCount).toEqual(1);
});

it('should be able to take input from user', () => {

    let onInputCallCount = 0;
    const removeDevice = () => {
        onInputCallCount++;
    };
    const searchWrapper = shallow((<CartDetails cartDetails={cartDetails} onRemoveCartDetails={removeDevice}>Ok!</CartDetails>));
    const searchBox = searchWrapper.find('#btn-danger');

    searchBox.simulate('click');
    expect(onInputCallCount).toEqual(1);
});



it('should be able to take input from user', () => {
    const searchWrapper = shallow((<CartDetails cartDetails={cartDetails}>Ok!</CartDetails>));
    const searchBox = searchWrapper.find('td').first();
    expect(searchBox.text()).toEqual("OPPO Reno 2F");
});
