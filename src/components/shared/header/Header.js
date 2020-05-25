import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from "prop-types";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBBtn, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';
import UserContext from '../../../provider/UserProvider';
const headerColor = { backgroundColor: '#3f51b5' }

function Header(props) {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const {
        history
    } = props;
    function handleClick() {
        history.push("/login");
    };

    function logoutUser() {
        setLoggedInUser({
            loggedInUser: {
                name: "",
                password: ""
            }, isLoggedIn: false
        });
    }

    return (<header>
        <MDBNavbar style={headerColor} dark expand="md" scrolling fixed="top">
            <MDBNavbarBrand href="/">
                <strong>Go To Mobile Store</strong>
            </MDBNavbarBrand>
            <MDBCollapse isOpen={false} navbar>
                <MDBNavbarNav right>
                    {loggedInUser.name && <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle caret color="primary" > {loggedInUser.name}</MDBDropdownToggle>
                            <MDBDropdownMenu right color="primary">
                                <MDBDropdownItem onClick={logoutUser} >Logout</MDBDropdownItem>
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