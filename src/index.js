import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider as ReduxProvider } from "react-redux";
import
  'bootstrap-css-only/css/bootstrap.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
import UserProvider from './provider/UserProvider';
// import * as serviceWorker from './serviceWorker';

import configureStore from "./redux/configureStore";

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    {/* <UserProvider value={null}> */}
    <Router>
      <App />
    </Router>
    {/* </UserProvider> */}
  </ReduxProvider>,
  document.getElementById('root')
);

