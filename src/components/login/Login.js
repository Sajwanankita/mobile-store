import React from 'react';
import './Login.css'
import { MDBBtn } from 'mdbreact';
import { toast } from "react-toastify";
import UserContext from '../../provider/UserProvider';
import * as userService from "./../../core/services/userService";

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      errors: {
        username: '',
        password: '',
      },
      validUser: {
        name: "",
        password: ""
      },
      isLoggedIn: false
    };
  }

  componentDidMount() {
    let value = this.context;
    this.setState({ validUser: value.loggedInUser });
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    this.setState({ disable: false });

    switch (name) {
      case 'username':
        errors.username = value.length === 0 ? 'User Name is required' : value.length < 5
          ? 'User Name must be at least 5 characters long'
          : '';
        break;
      case 'password':
        errors.password = value.length === 0 ? 'Passsword is required' :
          value.length < 5
            ? 'Password must be at least 5 characters long'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }


  validateUser() {
    userService.fetchUsers().then(users => {
      let authUser = users.find(user => user.name
        === this.state.username) || null;
      if (authUser && authUser.name === this.state.username && authUser.password === this.state.password) {
        this.context.setLoggedInUser({
          loggedInUser: {
            name: this.state.username,
            password: this.state.password
          },
          isLoggedIn: true
        });
        toast.success("Logged in successfully");
        this.props.history.push("/products")
      } else {
        this.context.setLoggedInUser({
          loggedInUser: {
            name: "",
            password: ""
          }, isLoggedIn: false
        });
        toast.error("Invalid credentials")
      }
    });

  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm(this.state.errors) || this.state.username === null || this.state.password === null) {
      toast.error("Please enter the valid data");
    } else {
      this.validateUser();
    }
  }

  handleUsernameChange = (event) => {
    this.handleChange(event);
    this.setState({ username: event.target.value });

  }

  handlePasswordChange = (event) => {
    this.handleChange(event);
    this.setState({ password: event.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Create Account</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='username'>
              <label htmlFor="username">User Name</label>
              <input type='text' name='username' onChange={this.handleUsernameChange} noValidate />
              {errors.username.length > 0 &&
                <span className='error'>{errors.username}</span>}
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input type='password' name='password' onChange={this.handlePasswordChange} noValidate />
              {errors.password.length > 0 &&
                <span className='error'>{errors.password}</span>}
            </div>
            <div className='submit'>
              <MDBBtn color="primary" type="submit" size="lg" >Login</MDBBtn>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.contextType = UserContext; 