import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.css";
import App from "./App";

import { Provider} from 'react-redux'
import { store } from './store/store';
import { fetchProduct } from './Features/productSlice';
import { getTotal } from "./Features/cartSlice";
import { loadUser } from "./Features/authSlice";


store.dispatch(fetchProduct())
store.dispatch(getTotal())
store.dispatch(loadUser(null))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
