import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import './../login/Login.css';
import UserContext from './../../provider/UserProvider';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

// function handleResetForm(formData) {
//   formData = null;
//   console.log("here");
//   // reset();
// }



export default function LoginPage(props) {
  const { register, handleSubmit, errors, clearError } = useForm();

  const {
    history
  } = props;

  const [user, setUser] = useState({});
  let [isInvalidUser, setIsInvalidUser] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  console.log("loggedInUser");
  // clearError();

  function handleResetForm() {
    setUser({ username: "", password: "" });
  }

  function handleSubmitForm(formData) {
    console.log("The status of formData", formData);
    fetch("http://localhost:3001/users").then(resp => resp.json()).then(users => {
      let authUser = users.find(user => user.name
        === formData.username) || null;
      if (authUser.name === formData.username && authUser.password === formData.password) {
        console.log("loggedInUser");
        setLoggedInUser({
          loggedInUser: {
            name: formData.username,
            password: formData.password
          },
          isLoggedIn: true
        });
      history.push("/products")
      } else {
        console.log("here")
        setIsInvalidUser(true);
      }
    });

  }



  console.log(errors);


  return (
    <MDBContainer className={"login-container"}>
      <MDBRow className={"login-layout"}>
        <MDBCol md="6">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <p className="h5 text-center mb-4 signin-title">Sign in</p>
            <div className="grey-text">
              <MDBInput className="hello" required
                label="Type your email"
                value={user.username} name="username" icon="envelope" type="text" inputRef={register()}
              />


              <MDBInput
                value={user.password}
                label="Type your password" name="password" icon="lock" required type="password" inputRef={register()}
              />
              {isInvalidUser &&  <span className="validation-error">This is required</span>}
            </div>
            <div className="text-center">
              <MDBBtn type="submit" value="Submit" >Login</MDBBtn>
              <MDBBtn onClick={handleResetForm} value="Reset" >Reset</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

LoginPage.propTypes={
  history: PropTypes.object.isRequired
}