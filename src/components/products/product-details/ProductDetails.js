// import { fetchDevices } from "../../../core/services/deviceService";
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdbreact";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart, loadCart } from "./../../../redux/actions/cartActions";
import { loadDevices } from "./../../../redux/actions/deviceActioons";
import "./ProductDetails.css";


export function ProductDetails({
  loadDevices,
  addToCart,
  loadCart,
  devices,
  history,
  colors,
  cart,
  ...props
}) {

  const [device, setDevice] = useState({ ...props.device });

  useEffect(() => {
    if (devices.length === 0) {
      loadDevices().catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setDevice({ ...props.device });
    }

    if (cart.length === 0) {
      loadCart().catch(error => {
        alert("Loading cart failed" + error);
      });
    }
  }, [devices.length, cart.length, loadDevices, props.device, loadCart]);

  const handleAddDeviceToCart = (device) => {
    const cartDetails = cart.length !== 0 ? getCartDetailsById(cart, device.id) : null;
    let updatedCartDetails;
    if (cartDetails) {
      updatedCartDetails = { ...cartDetails, quantity: cartDetails.quantity + 1 }
    } else {
      updatedCartDetails = {
        device: device,
        quantity: 1
      }
    }
    addToCart(updatedCartDetails);

  }

  const getCartDetailsById = (cart, id) => {
    return cart.find(cartDetails => cartDetails.device.id === id) || null;
  }

  return (
    <>
      <MDBCol >
        <img src="/image.jpg" className="float-left device-image" alt="" />
        <MDBRow>
          <MDBCol lg="6">
            <MDBCard className="device-details" pricing>
              <div className="price header white-text blue rounded-top">
                <h2 className="number device-number">  &#x20b9;  {device.price}</h2>
                <div className="version">
                  <h5 className="mb-0 device-name">{device.name}</h5>
                </div>
              </div>
              <MDBCardBody className="striped mb-1">
                <ul>
                  <li>
                    <p>
                      {device.storage} <strong>Of Storage</strong>
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Model Number : </strong>  {device.modelNumber}
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Screen Size : </strong> {device.screenSize}
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Operating System : </strong> {device.operatingSystem}
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Storage : </strong> {device.storage}
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Ram : </strong> {device.ram}
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Colors : </strong>
                      {colors}
                    </p>
                  </li>
                </ul>
                <MDBBtn color="primary" className="add-to-cart-button" size="lg" onClick={() => handleAddDeviceToCart(device)} > Add to Cart</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBCol>
    </>
  );
}

ProductDetails.propTypes = {
  cart: PropTypes.array.isRequired,
  devices: PropTypes.array.isRequired,
  loadDevices: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};



const mapStateToProps = (state, ownProps) => {
  const deviceId = ownProps.match.params.id;
  const device =
    deviceId && state.devices.length > 0 ?
      getDeviceById(state.devices, deviceId) : null;
  let colors = device && device.colors.toString();
  return {
    device,
    colors,
    devices: state.devices,
    cart: state.cart
  };

}


const getDeviceById = (devices, id) => {
  return devices.find(device => device.id === id) || null;
}

const mapDispatchToProps = {
  loadDevices,
  loadCart,
  addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
