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

it('should have a input box to input quantity', () => {
    const searchWrapper = render();
    const inputBox = searchWrapper.find('#quantity');
    expect(inputBox.exists()).toBe(true);
});

it('should be able to call update quantity on update click', () => {
    const mockOnUpdateQuantity = jest.fn();
    const searchWrapper = shallow((<CartDetails cartDetails={cartDetails} onUpdateQuantity={mockOnUpdateQuantity}>Ok!</CartDetails>));
    const updateBtn = searchWrapper.find('#update-button');

    updateBtn.simulate('click');
    expect(mockOnUpdateQuantity).toHaveBeenCalledTimes(1);
});

it('should be able to call increment quantity on plus icon click', () => {
    const mockOnHandleIncrementDevice = jest.fn();

    const searchWrapper = shallow((<CartDetails cartDetails={cartDetails} onIncrementDevice={mockOnHandleIncrementDevice}>Ok!</CartDetails>));
    const plusBtn = searchWrapper.find('.plus');

    plusBtn.simulate('click');
    expect(mockOnHandleIncrementDevice).toHaveBeenCalledTimes(1);
});

it('should be able to call decrement quantity on minus icon click', () => {
    const mockOnHandleDecrementDevice = jest.fn();
    const searchWrapper = shallow((<CartDetails cartDetails={cartDetails} onDecrementDevice={mockOnHandleDecrementDevice}>Ok!</CartDetails>));
    const minusBtn = searchWrapper.find('.minus');

    minusBtn.simulate('click');
    expect(mockOnHandleDecrementDevice).toHaveBeenCalledTimes(1);
});

it('should be able to call remove quantity on remove icon click', () => {
    const mockOnremoveDevice = jest.fn();
    const searchWrapper = shallow((<CartDetails cartDetails={cartDetails} onRemoveCartDetails={mockOnremoveDevice}>Ok!</CartDetails>));
    const removeBtn = searchWrapper.find('#btn-danger');
    removeBtn.simulate('click');
    expect(mockOnremoveDevice).toHaveBeenCalledTimes(1);
});


it('should be able to show name n theb detail page', () => {
    const searchWrapper = shallow((<CartDetails cartDetails={cartDetails}>Ok!</CartDetails>));
    const searchBox = searchWrapper.find('td').first();
    expect(searchBox.text()).toEqual("OPPO Reno 2F");
});
