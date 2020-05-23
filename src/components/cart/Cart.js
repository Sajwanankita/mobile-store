import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart, loadCart, removeDeviceFromCart } from "./../../redux/actions/cartActions"
import "./Cart.css";
import CartDetails from "./CartDetails";
import { MDBBtn } from "mdbreact";
import { toast } from "react-toastify";

function Cart(props) {

  const {
    loadCart,
    addToCart,
    removeDeviceFromCart,
    cart
  } = props;

  // const [cart, setCart] = useState([...props.cart]);

  useEffect(() => {
    // console.log(cart.length + "lenttghghg")
    if (cart.length === 0) {
      loadCart().catch(error => {
        alert("Loading cart failed" + error);
      });
    }
  }, [cart.length, loadCart]);


  function updateQuantity(quantity, cartDetails) {
    console.log(quantity + "...............................");

    if (quantity === 0) {
      removeDevice(cartDetails);
    } else {
      console.log(quantity)
      updateDeviceQuantity(quantity, { ...cartDetails }.device)
    }

  }

  // function removeDeviceFromCart(cartDetails) {
  //   console.log(cartDetails);
  // }


  function updateDeviceQuantity(quantity, device) {
    debugger;
    const cartDetails = cart.length !== 0 ? getCartDetailsById(cart, device.id) : null;
    let updatedCartDetails;
    if (cartDetails) {
      updatedCartDetails = { ...cartDetails, quantity }
      console.log("hkhhkhkhkhkhk" + updatedCartDetails);
      addToCart(updatedCartDetails);
    }
  }

  function handleDecrementDevice(cartDetails) {
    console.log("hererere");
    const quantity = --cartDetails.quantity;
    updateQuantity(quantity, cartDetails);

  }

  function handleIncrementDevice(cartDetails) {
    console.log("hererere");
    const quantity = ++cartDetails.quantity;
    updateQuantity(quantity, cartDetails);

  }

  function getCartDetailsById(cart, id) {
    return cart.find(cartDetails => cartDetails.device.id === id) || null;
  }

  function removeDevice(cartDetails) {
    console.log('remove');
    console.log(cartDetails);

    removeDeviceFromCart(cartDetails.id);
  }

  function getTotalItems() {
    let totalItems = 0;
    cart.forEach(cartDetails => {
      totalItems += cartDetails.quantity;
    })
    return totalItems;
  }

  function getTotalPrice() {
    let totalPrice = 0;
    cart.forEach(cartDetails => {
      totalPrice += cartDetails.device.price * cartDetails.quantity ;
    })
    return totalPrice;
  }

  function placeOrder() {
    const orderNumber= 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8);
      return v.toString(16);
    });
    toast.success("Your orde with order id" + orderNumber + "has been placed succesfully");
    clearCart();
  }

  return (

    <div className="jumbotron">
      {/* {cart} */}
      <div class="card">
        <h3 class="card-header text-center font-weight-bold text-uppercase py-4">Cart Details</h3>
        <div class="card-body">
          <div id="table" class="table-editable">
            <table class="table table-bordered table-responsive-md table-striped text-center">
              <thead>
                <tr>
                  <th class="text-center font-weight-bold">Device</th>
                  <th class="text-center font-weight-bold">Model</th>
                  <th class="text-center font-weight-bold">Quantity</th>
                  <th class="text-center font-weight-bold">Price/Item</th>
                  <th class="text-center font-weight-bold">Total Price</th>
                  <th class="text-center font-weight-bold"></th>
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
        <div class="card cart-total">
          <span class="card-header text-right font-weight-bold py-4 price">Sub Total ({getTotalItems()}) device(s) :  &#x20b9;  <span>{getTotalPrice()}  </span> </span>
          <div>
            <MDBBtn color="primary" className="order-button" size="lg" onClick={placeOrder}> Place Order </MDBBtn>
          </div>
        </div>
      </div>

    </div>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

const mapDispatchToProps = {
  loadCart,
  addToCart,
  removeDeviceFromCart,
  clearCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
