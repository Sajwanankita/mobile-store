import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadDevices } from "./../../../redux/actions/deviceActioons"
import { addToCart, loadCart } from "./../../../redux/actions/cartActions"
import PropTypes from "prop-types";
import "./ProductListContainer.css";

import { InputText } from 'primereact/inputtext';
import {
    MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBCard, MDBView, MDBBtn,
    MDBCardImage, MDBDropdownToggle, MDBDropdown, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";


function ProductListContainer(props) {


    const {
        loadDevices,
        addToCart,
        loadCart,
        cart
    } = props;

    const [devices, setDevices] = useState([...props.devices]);
    const [seachText, setSeachText] = useState("");

    useEffect(() => {
        if (props.devices.length === 0) {
            loadDevices().catch(error => {
                alert("Loading devices failed" + error);
            });
        } else {
            setDevices([...props.devices])
        }
        if (cart.length === 0) {
            loadCart().catch(error => {
                alert("Loading cart failed" + error);
            });
        }
    }, [props.devices, cart.length, loadDevices, loadCart]);

    function handleAddDeviceToCart(device) {
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

    function getCartDetailsById(cart, id) {
        return cart.find(cartDetails => cartDetails.device.id === id) || null;
    }

    function sort(order) {
        if (order === 'ASC') {
            setDevices([...devices].sort((a, b) => {
                return a.price < b.price
                    ? 1
                    : -1;
            }))
        } else {
            setDevices([...devices].sort((a, b) => a.price > b.price
                ? 1
                : -1));
        }
    }

    function search(event) {
        const inputText = event.target.value;
        setSeachText(inputText);
        if (inputText !== "") {
            const filteredDevices = [...props.devices].filter(device => device.name.toLowerCase().includes(inputText.toLowerCase()));
            setDevices([...filteredDevices]);
        } else {
            setDevices([...props.devices])
        }

    }

    return (
        <>
          
                <div className="app">
                    <span className="p-float-label here">
                        <InputText id="in" className="hey" onChange={(e) => search(e)} />
                        {seachText === "" && <label htmlFor="in">Search here...</label>}
                    </span>            
                    <MDBDropdown className="drop-dwon">
                    <MDBDropdownToggle caret color="ins" className="hello">
                        Sort By :  &nbsp; &nbsp; &nbsp;
                     </MDBDropdownToggle>
                    <MDBDropdownMenu color="ins" basic>
                        <MDBDropdownItem onClick={() => sort('ASC')} >Price: High to Low</MDBDropdownItem>
                        <MDBDropdownItem onClick={() => sort('DESC')}>Price: Low to High</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
                </div>
    
            <MDBRow>



                {devices.map(device => {
                    return (


                        <MDBCol md='3' key={device.id} className="product-card">
                            <MDBCard wide cascade>
                                <MDBView cascade>



                                    {/* <i class="fa fa-mobile fa-9x" aria-hidden="true"></i> */}
                                    <MDBCardImage
                                        cascade
                                        src="/image.jpg"
                                        top
                                        alt="sample photo"
                                    />

                                </MDBView>

                                <MDBCardBody cascade className='text-center blue-text'>
                                    <MDBCardTitle className='card-title'>
                                        <strong>{device.name}</strong>
                                    </MDBCardTitle>

                                    <p className='font-weight-bold'>Price : {device.price}</p>
                                    <MDBBtn color="success" size="lg" href={"/products/" + device.id}>View</MDBBtn>
                                    <MDBBtn color="success" size="lg" onClick={() => handleAddDeviceToCart(device)}>Add to Cart</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    );
                })}
                <br></br>
            </MDBRow>
        </>
    );
}

ProductListContainer.propTypes = {
    cart: PropTypes.array.isRequired,
    devices: PropTypes.array.isRequired,
    loadDevices: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};



function mapStateToProps(state) {
    return {
        devices: state.devices,
        cart: state.cart
    };
}

const mapDispatchToProps = {
    loadDevices,
    loadCart,
    addToCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductListContainer);
