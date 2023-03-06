import axios from "axios";
import React from "react";
import { url } from "../Features/api";
import { useSelector } from "react-redux";
export const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  const handlerCheckout =  () => {
    axios.post(`${url}/stripe/create-checkout-session`, {
      cartItems,
      userId : user._id
    }).then((res)=> {
      console.log(res.data.URL);
      if(res.data.URL) {
        window.location.href = res.data.URL
      }
    }).catch((error)=> {
      console.log(error.messsage);
    })
  };
  return (
    <>
      <button
        onClick={() => handlerCheckout()}
        className="btn btn-primary w-100 "
      >
        Check out
      </button>
    </>
  );
};
