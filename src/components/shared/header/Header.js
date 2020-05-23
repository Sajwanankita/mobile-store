import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBBtn, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBMask, MDBView, MDBIcon, MDBNav, MDBBtnGroup, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import UserContext from '../../../provider/UserProvider';
// import { BrowserRouter as Router } from 'react-router-dom';
const bgPink = { backgroundColor: '#3f51b5' }

// const bgPink = { si: '#e91e63' }
function Header(props) {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);
    const {
        history
    } = props;
    //   const { user, setUser } = this.context;
    function handleClick() {
        history.push("/login");
    };

console.log("loggedInUser header");
console.log(loggedInUser);

    return (<header>
        <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
            <MDBNavbarBrand href="/">
                <strong>Mobile Store</strong>
            </MDBNavbarBrand>
            <MDBCollapse isOpen={false} navbar>
                <MDBNavbarNav right>
                    {loggedInUser.name && <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle caret color="primary" >   {loggedInUser.name}</MDBDropdownToggle>
                            <MDBDropdownMenu right color="primary">
                                <MDBDropdownItem >Logout</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>}
                    {!loggedInUser.name && <MDBNavItem>
                        <MDBBtn onClick={handleClick} color="primary" rounded>Login</MDBBtn>
                    </MDBNavItem>}

                    <MDBNavItem>
                        <MDBNavLink to="/cart"><MDBIcon fas icon="cart-plus fa-2x" /></MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
    </header>);
}


Header.propTypes = {
    history: PropTypes.object.isRequired
};

export default withRouter(Header);