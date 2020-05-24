import * as types from "./actionTypes";
import * as deviceService from "./../../core/services/deviceService";

export function loadDevicesSuccess(devices) {
    return { type: types.LOAD_DEVICES_SUCCESS, devices };
}

export function loadDevices() {
    return function (dispatch) {
        return deviceService
            .fetchDevices()
            .then(devices => {
                dispatch(loadDevicesSuccess(devices));
            })
            .catch(error => {
                throw error;
            });
    };
}

