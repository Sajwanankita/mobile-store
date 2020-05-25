import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadDevices } from "../../../redux/actions/deviceActioons"
import { addToCart, loadCart } from "../../../redux/actions/cartActions"
import PropTypes from "prop-types";
import "./ProductListContainer.css";
import ReactPaginate from 'react-paginate';
import { InputText } from 'primereact/inputtext';
import {
    MDBDropdownToggle, MDBDropdown, MDBDropdownMenu, MDBDropdownItem, MDBRow
} from "mdbreact";
import { ProductCard } from "../product-card/ProductCard";


export function ProductListContainer({
    loadDevices,
    addToCart,
    cart,
    ...props
}) {

    const [seachText, setSeachText] = useState("");
    const [reloadPage, setReloadPage] = useState(false);
    const [paginationAttributes, setPaginationAttributes] = useState({
        offset: 0,
        perPage: 4,
        currentPage: 0,
        searchParam: ''
    });

    const [pagination, setPagination] = useState({
        pageCount: 0,
        postData: []
    });

    useEffect(() => {
        if (props.devices.length === 0) {
            loadDevices().catch(error => {
                alert("Loading devices failed" + error);
            });
        } else {
            receivedData();
        }
    }, [props.devices, paginationAttributes, loadDevices]);


    function receivedData() {
        debugger;
        const d = [...props.devices];
        let filteredDevices = [];
        if (paginationAttributes.searchParam !== "") {
            filteredDevices = d.filter(device => device.name.toLowerCase().includes(paginationAttributes.searchParam.toLowerCase()));
        } else {
            filteredDevices = d;
        }

        const postData = (filteredDevices && filteredDevices.length) > 0 ? filteredDevices.slice(paginationAttributes.offset, paginationAttributes.offset + paginationAttributes.perPage) : [];

        if (Math.ceil([...filteredDevices].length / paginationAttributes.perPage) < paginationAttributes.currentPage + 1) {
            setReloadPage(true);
        } else {
            setReloadPage(false);
        }
        setPagination({
            ...pagination,
            pageCount: Math.ceil([...filteredDevices].length / paginationAttributes.perPage),
            postData
        })

    }


    function handlePageClick(e) {
        debugger;
        const selectedPage = e.selected;
        const pageoffset = selectedPage * paginationAttributes.perPage;

        setPaginationAttributes({
            ...paginationAttributes,
            currentPage: selectedPage,
            offset: pageoffset,
            searchParam: seachText
        });
    };

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
        let sortedData = [];
        if (order === 'ASC') {
            sortedData = [...pagination.postData].sort((a, b) => {
                return a.price < b.price
                    ? 1
                    : -1;
            })
        } else {
            sortedData = [...pagination.postData].sort((a, b) => a.price > b.price
                ? 1
                : -1);

        }
        setPagination({
            ...pagination,
            pageCount: Math.ceil([...props.devices].length / paginationAttributes.perPage),
            postData: sortedData
        })
    }

    function search(event) {
        const inputText = event.target.value;
        setSeachText(inputText);
        setPaginationAttributes({ ...paginationAttributes, searchParam: inputText });
    }

    return (
        <div>
            <div className="app">
                <span className="p-float-label here">
                    <InputText id="in" className="hey" onChange={(e) => search(e)} />
                    {seachText === "" && <label htmlFor="in">Search here...</label>}
                </span>
                <MDBDropdown className="drop-dwon">
                    <MDBDropdownToggle caret color="ins" className="hello">
                        Sort By Price &nbsp;
                     </MDBDropdownToggle>
                    <MDBDropdownMenu color="ins" basic>
                        <MDBDropdownItem onClick={() => sort('ASC')} >Price: High to Low</MDBDropdownItem>
                        <MDBDropdownItem onClick={() => sort('DESC')}>Price: Low to High</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </div>

            <MDBRow>
                {reloadPage && <div className="jumbotron empty-message">
                    Oops! The current selected page overflows the searched results. Please select a page..
            </div>}
                {[...pagination.postData].map(device => {
                    return (
                        <ProductCard key={device.id} device={device} onAddDeviceToCart={handleAddDeviceToCart}>  </ProductCard>
                    );
                })}
                <br></br>
            </MDBRow>
            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pagination.pageCount}
                marginPagesDisplayed={4}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        </div >
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
