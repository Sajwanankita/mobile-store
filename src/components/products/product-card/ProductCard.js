import React from "react";
import "./ProductCard.css";
import PropTypes from "prop-types";
import {
    MDBCardBody, MDBCardTitle, MDBCol, MDBCard, MDBView, MDBBtn,
    MDBCardImage,
} from "mdbreact";


export function ProductCard({
    device,
    onAddDeviceToCart
}) {

    return (
        <MDBCol md='3' key={device.id} className="product-card">
            <MDBCard wide cascade>
                <MDBView cascade>
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
                    <MDBBtn color="success" size="lg" onClick={() => onAddDeviceToCart(device)}>Add to Cart</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );
}


ProductCard.propTypes = {
    device: PropTypes.object.isRequired,
    onAddDeviceToCart: PropTypes.func.isRequired,
};

