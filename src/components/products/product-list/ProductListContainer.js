import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadDevices } from "../../../redux/actions/deviceActioons"
import { addToCart, loadCart } from "../../../redux/actions/cartActions"
import PropTypes from "prop-types";
import "./ProductListContainer.css";
import ReactPaginate from 'react-paginate';
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

    // const [devices, setDevices] = useState([...props.devices]);
    const [seachText, setSeachText] = useState("");
    const [isEmpty, setIsempty] = useState(true);
    const [change, setChange] = useState(false);
    const [array, setArray] = useState([]);

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
        // const postData = slice;
        console.log('post data');
        console.log(postData);
    

        setPagination({
            ...pagination,
            pageCount: Math.ceil([...props.devices].length / paginationAttributes.perPage),
            postData
        })
        console.log(pagination.pageCount);


    }

    useEffect(() => {
        if (props.devices.length === 0) {
            loadDevices().catch(error => {
                alert("Loading devices failed" + error);
            });
        } else {
            // if () {
            receivedData();
            setIsempty(false)
            // }
        }
    }, [props.devices, paginationAttributes, loadDevices, array]);



    function handlePageClick(e) {
        debugger;
        const selectedPage = e.selected;
        const offset2 = selectedPage * paginationAttributes.perPage;

        setPaginationAttributes({
            ...paginationAttributes,
            currentPage: selectedPage,
            offset: offset2,
            searchParam: seachText
        });
        // receivedData();
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
            // setPagination({});
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
        setSeachText(event.target.value);
        let filteredDevices = [];
        setSeachText(inputText);

        setPaginationAttributes({ ...paginationAttributes, searchParam: event.target.value });
        // if (inputText !== "") {
        //     filteredDevices = [...pagination.postData].filter(device => device.name.toLowerCase().includes(inputText.toLowerCase()));
        //     // setDevices([...filteredDevices]);

        //     setPagination({
        //         ...pagination,
        //         postData: [...filteredDevices]
        //     })
        // } else {
        //     filteredDevices = [...pagination.postData]
        //     // setDevices([...pagination.postData])
        //     setPagination({
        //         ...pagination,
        //         postData: filteredDevices
        //     })

        // }
        // setArray([...filteredDevices]);
        // receivedData();

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
                        Sort By :  &nbsp; &nbsp; &nbsp;
                     </MDBDropdownToggle>
                    <MDBDropdownMenu color="ins" basic>
                        <MDBDropdownItem onClick={() => sort('ASC')} >Price: High to Low</MDBDropdownItem>
                        <MDBDropdownItem onClick={() => sort('DESC')}>Price: Low to High</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </div>

            <MDBRow>
                {/* {devices.length === 0 && !isEmpty && <div className="jumbotron error-message">
                        We couldn't find any matches!
                        Please check the spelling or try searching something else
            </div>} */}
                {[...pagination.postData].map(device => {
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
                                    <MDBBtn color="success" size="lg" onClick={() => handleAddDeviceToCart(device)}>Add to Cart</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    );
                })}
                <br></br>
            </MDBRow>

            <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={paginationAttributes.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        </div>
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
