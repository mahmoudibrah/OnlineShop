import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Register } from "./Components/auth/Register.jsx";
import { Login } from "./Components/auth/Login";
import CheckoutSuccess from "./Components/CheckoutSuccess";
import Dashboard from "./Components/admin/Dashboard";
import Products from "./Components/admin/Products";
import Summary from "./Components/admin/Summary";
import CreateProduct from "./Components/admin/CreateProduct";
import ProductsList from "./Components/admin/list/ProductsList";
import { Users } from "./Components/admin/Users";
import Orders from "./Components/admin/Orders";
import { Product } from "./Components/Details/Product";
import Order from "./Components/Details/Order";
import UserProfile from "./Components/Details/UserProfile";

import { useSelector } from 'react-redux';
 


function App() {



const auth =  useSelector(state => state.auth)
console.log( auth.isAdmin) 

  function ProtectedRoute({children}) {
    if (auth.isAdmin === true) {
      return children
    } else {
      return <Navigate to="/cart"/>
    }
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/admin" element={  <ProtectedRoute>  <Dashboard /> </ProtectedRoute>    }>
            <Route path="products" element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path="create-product" element={<CreateProduct />} />
            </Route>
            <Route path="summary" element={<Summary />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
