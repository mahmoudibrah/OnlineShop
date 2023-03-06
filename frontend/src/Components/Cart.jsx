import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PayButton } from './PayButton';
import {
  addToCart,
  clearCart,
  decrement,
  getTotal,
  removeFromCart,
} from "../Features/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const handlerFromRemove = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handlerdecrement = (cartItem) => {
    dispatch(decrement(cartItem));
  };
  const handlerIncrement = (cartItem) => {
    dispatch(addToCart(cartItem));
  };
  const handlerClearCart = () => {
    dispatch(clearCart());
  };

  //  dispatch(getTotal())
  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const auth = useSelector((state) => state.auth);

  return (
    <div className="container cart-container">
      <h2 className="fw-bolder text-center fs-1 py-3">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <>
          <div className="cart-empty text-center">
            <p className="fs-5 mt-5">Your cart is currently empty</p>
          </div>
          <div className="sart-shopping text-center">
            <Link to={"/"} className="text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </>
      ) : (
        <div>
          <div className="titles my-3 d-flex justify-content-between align-items-center">
            <h3 className="product-title ps-3">product</h3>
            <h3 className="price">price</h3>
            <h3 className="Quantity">Quantity</h3>
            <h3 className="total pe-3 ">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <div
                key={cartItem._id}
                className="cart-item border-top d-flex justify-content-between py-2"
              >
                <div className="cart-product d-flex">
                  <img
                    style={{ width: "150px" }}
                    src={cartItem.image.url}
                    alt={cartItem.name}
                  />
                  <div className="">
                    <h3>{cartItem.name}</h3>
                    <p>{cartItem.desc}</p>
                    <p>{cartItem.brand}</p>
                    <button
                      onClick={() => handlerFromRemove(cartItem)}
                      className="btn text-secondary"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart product-price">{cartItem.price}$</div>
                <div className="cart-product-quantity border rounded w-50 d-flex align-items-center justify-content-between ">
                  <button
                    onClick={() => handlerdecrement(cartItem)}
                    className="btn"
                  >
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button
                    onClick={() => handlerIncrement(cartItem)}
                    className="btn"
                  >
                    +
                  </button>
                </div>
                <div className="cart-product-total-price d-flex justify-content-end pe-3">
                  {cartItem.price * cartItem.cartQuantity}$
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary d-flex justify-content-between py-3 border-top align-items-start">
            <button
              onClick={() => handlerClearCart()}
              className="clear-cart rounded btn btn-danger ms-5 mt-3"
            >
              Clear cart
            </button>
            <div className="cart-checkout mb-5 ">
              <div className="subtotal">
                <div className="d-flex justify-content-between py-3">
                  <span>SubTotal</span>
                  <span className="amount">{cart.cartTotalAmount}$</span>
                </div>
                <p className="text-muted">
                  Taxes and shipping calculated at checkout
                </p>
                {auth._id ? (
                  <PayButton cartItems={cart.cartItems}/>
                ) : (
                  <button onClick={()=> navigate('/login')} className="btn btn-warning w-100 text-black">
                    login to Check out{" "}
                  </button>
                )}

                <div className="continue-shopping">
                  <Link to={"/"} className="text-muted fs-6 my-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-left-short mx-3"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                      />
                    </svg>
                    <span>continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
