import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addToCart, loadCart } from "../../../redux/actions/cartActions"
import "./CartDetails.css";

function CartDetails(props) {

    const { onRemoveCartDetails,
        cartDetails,
        onUpdateQuantity,
        onIncrementDevice,
        onDecrementDevice
    } = props;

    const [quantity, setQuantity] = useState({ ...cartDetails }.quantity);
    const [cartDevices, setCartDevices] = useState({ ...cartDetails });

    useEffect(() => {
        setCartDevices({ ...cartDetails })
    }, [cartDetails]);

    // function onInc4() {
    //     setQuantity({...cartDetails}.quantity++);
    //     onInc2({...cartDetails});
    // }

    function updateDeviceQuantity(event) {
        setQuantity(Number(event.target.value));
    }


    return (
        <tr key={cartDevices.quantity} className="cart-details">
            <td class="pt-3-half">{cartDevices.device.name}</td>
            <td class="pt-3-half" >{cartDevices.device.modelNumber}</td>
            <td class="pt-3-half" >
                <div>
                    <div className="def-number-input number-input">
                        <button className="minus" onClick={() => onDecrementDevice(cartDevices)} ></button>
                        <input id="quantity" defaultValue={cartDevices.quantity} onChange={updateDeviceQuantity}
                            type="number" />
                        <button className="plus" onClick={() => onIncrementDevice(cartDevices)}></button>
                    </div>
                    <button type="button"
                        class="btn btn-primary btn-rounded btn-sm my-0" onClick={() => onUpdateQuantity(quantity, cartDevices)}>Update</button>
                </div>
            </td>
            <td class="pt-3-half" >{cartDevices.device.price}</td>
            <td class="pt-3-half" >{cartDevices.device.price * cartDevices.quantity}</td>
            <td>
                <span class="table-remove"><button type="button"
                    class="btn btn-danger btn-rounded btn-sm my-0" onClick={() => onRemoveCartDetails(cartDevices)}>Remove</button></span>
            </td>
        </tr>
    );
}

function mapStateToProps(state) {
    return {
        cart: state.cart,
    };
}

const mapDispatchToProps = {
    loadCart,
    addToCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartDetails);
