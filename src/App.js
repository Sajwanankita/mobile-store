import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/login/Login"
import ProductDetails from "./components/products/product-details/ProductDetails";
import Header from "./components/shared/header/Header";
import Cart from "./components/cart/cart-container/Cart";
import "./App.css"
import { UserProvider } from "./provider/UserProvider";
import ProductListContainer from "./components/products/product-list/ProductListContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./components/page-not-found/PageNotFound";

function App() {
  return (
    <div className="container-fluid">
      <UserProvider>
        <Header />
        <div className="app-layout">
            <Switch>
              <Route exact path="/" component={ProductListContainer} />
              <Route path="/login" component={LoginPage} />
              <Route path="/products" exact component={ProductListContainer} />
              <Route path="/products/:id" component={ProductDetails} />
              <Route path="/cart" component={Cart} />
              <Route component={PageNotFound} />
            </Switch>
        </div>
      </UserProvider>
      <ToastContainer className="toaster"  position={"top-center"} autoClose={2000} hideProgressBar></ToastContainer>
    </div>
  );
}

export default App;