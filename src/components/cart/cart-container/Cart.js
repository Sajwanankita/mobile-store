import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { addToCart, loadCart, removeDeviceFromCart } from "../../../redux/actions/cartActions"
import "./Cart.css";
import { CartDetails } from "../cart-details/CartDetails";
import { MDBBtn } from "mdbreact";
import { toast } from "react-toastify";
import UserContext from "../../../provider/UserProvider";
import PropTypes from "prop-types";

export function Cart(props) {
  const { loggedInUser } = useContext(UserContext);

  const {
    loadCart,
    addToCart,
    removeDeviceFromCart,
    cart,
    history
  } = props;

  useEffect(() => {
    if (cart.length === 0) {
      loadCart().catch(error => {
        alert("Loading cart failed" + error);
      });
    }
  }, [cart.length, loadCart]);


  const updateQuantity = (quantity, cartDetails) => {
    if (quantity === 0) {
      removeDevice(cartDetails);
    } else {
      updateDeviceQuantity(quantity, { ...cartDetails }.device)
    }
  }


  const updateDeviceQuantity = (quantity, device) => {
    debugger;
    const cartDetails = cart.length !== 0 ? getCartDetailsById(cart, device.id) : null;
    let updatedCartDetails;
    if (cartDetails) {
      updatedCartDetails = { ...cartDetails, quantity }
      addToCart(updatedCartDetails);
    }
  }

  const handleDecrementDevice = (cartDetails) => {
    const quantity = --cartDetails.quantity;
    if (quantity === 0) {
      removeDevice(cartDetails);
    } else {
      updateQuantity(quantity, cartDetails);
    }
  }

  const handleIncrementDevice = (cartDetails) => {
    const quantity = ++cartDetails.quantity;
    updateQuantity(quantity, cartDetails);

  }

  const getCartDetailsById = (cart, id) => {
    return cart.find(cartDetails => cartDetails.device.id === id) || null;
  }

  const removeDevice = (cartDetails) => {
    removeDeviceFromCart(cartDetails.id);
  }

  const getTotalItems = () => {
    let totalItems = 0;
    cart.forEach(cartDetails => {
      totalItems += cartDetails.quantity;
    })
    return totalItems;
  }

  const getTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(cartDetails => {
      totalPrice += cartDetails.device.price * cartDetails.quantity;
    })
    return totalPrice;
  }

  const placeOrder = () => {

    if (loggedInUser.name === "") {
      history.push("/login");
      return;
    }
    const orderNumber = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
      return v.toString(16);
    });
    toast.success(`Your order with order id${orderNumber}has been placed succesfully`, { autoClose: 5000 });
    cart.forEach(cartDetails => {
      removeDeviceFromCart(cartDetails.id);
    })
  }

  return (
    <>
      {cart.length === 0 && <div className="jumbotron empty-message">
        Nothing to display !!! Your cart is empty &nbsp; &nbsp; &nbsp;
        <MDBBtn color="primary" size="lg" href={"/"}>Go To Store</MDBBtn>
      </div>
      }
      {cart.length !== 0 && <div className="jumbotron">
        <div className="card">
          <h3 className="card-header text-center font-weight-bold text-uppercase py-4 cart-details">Cart Details</h3>
          <div className="card-body">
            <div id="table" className="table-editable">
              <table className="table table-bordered table-responsive-md table-striped text-center">
                <thead>
                  <tr>
                    <th className="text-center font-weight-bold">Device</th>
                    <th className="text-center font-weight-bold">Model</th>
                    <th className="text-center font-weight-bold">Quantity</th>
                    <th className="text-center font-weight-bold">Price/Item</th>
                    <th className="text-center font-weight-bold">Total Price</th>
                    <th className="text-center font-weight-bold"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(cartDetails => {
                    return (cartDetails && <CartDetails key={cartDetails.id} cartDetails={cartDetails} onRemoveCartDetails={removeDevice}
                      onUpdateQuantity={updateQuantity}
                      onDecrementDevice={handleDecrementDevice} onIncrementDevice={handleIncrementDevice}></CartDetails>)
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card cart-total">
            <span className="card-header text-right font-weight-bold py-4 price">Sub Total ({getTotalItems()}) device(s) :  &#x20b9;  <span>{getTotalPrice()}  </span> </span>
            <div>
              {cart.length !== 0 && <MDBBtn color="primary" className="order-button" size="lg" onClick={placeOrder}> Place Order </MDBBtn>}
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}


Cart.propTypes = {
  loadCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeDeviceFromCart: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
}

const mapDispatchToProps = {
  loadCart,
  addToCart,
  removeDeviceFromCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
