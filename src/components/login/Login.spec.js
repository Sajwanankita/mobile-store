import React from "react";
import Login from "./Login";
import { shallow } from "enzyme/build";

describe("Login", () => {
    it("Should show error when username is not of required length", () => {
        const wrapper = shallow(<Login />);
        const input = wrapper.find("input").at(0);
        input.simulate("change", { target: { value: "admi", name: "username" }, preventDefault: jest.fn() });
        expect(wrapper.state('errors').username).toEqual("User Name must be at least 5 characters long");
    });

    it("Should show error when username is empty", () => {
        const wrapper = shallow(<Login />);
        const input = wrapper.find("input").at(0);
        input.simulate("change", { target: { value: "", name: "username" }, preventDefault: jest.fn() });
        expect(wrapper.state('errors').username).toEqual("User Name is required");
    });

    it("Should show error when password is not of required length", () => {
        const wrapper = shallow(<Login />);
        const input = wrapper.find("input").at(1);
        input.simulate("change", { target: { value: "admi", name: "password" }, preventDefault: jest.fn() });
        expect(wrapper.state('errors').password).toEqual("Password must be at least 5 characters long");
    });

    it("Should show error when password is empty", () => {
        const wrapper = shallow(<Login />);
        const input = wrapper.find("input").at(1);
        input.simulate("change", { target: { value: "", name: "password" }, preventDefault: jest.fn() });
        expect(wrapper.state('errors').password).toEqual("Passsword is required");
    });

    it("Should show error when password is empty", () => {
        const wrapper = shallow(<Login />);
        const input = wrapper.find("input").at(1);
        input.simulate("change", { target: { value: "", name: "password" }, preventDefault: jest.fn() });
        expect(wrapper.state('errors').password).toEqual("Passsword is required");
    });


    it("Should show no error when username is of valid length", () => {
        const wrapper = shallow(<Login />);
        const inputName = wrapper.find("input").at(0);
        const inputPassword = wrapper.find("input").at(1);
        inputName.simulate("change", { target: { value: "admin", name: "username" }, preventDefault: jest.fn() });
        inputPassword.simulate("change", { target: { value: "admin", name: "password" }, preventDefault: jest.fn() });
        expect(wrapper.state('errors').username).toEqual("");
        expect(wrapper.state('errors').password).toEqual("");
    });


    it('check submit', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('form')).toHaveLength(1);
    });

});