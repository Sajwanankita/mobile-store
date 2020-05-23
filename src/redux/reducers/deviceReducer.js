import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function deviceReducer(state = initialState.devices, action) {
  console.log("here" + action.type)
  switch (action.type) {
    case types.LOAD_DEVICES_SUCCESS:
      return action.devices;
    default:
      return state;
  }
}
