import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3001/devices/";

export function fetchDevices() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
