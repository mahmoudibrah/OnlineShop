import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      ); /// l w alkart fady  htgy lk -1 ||||| lw fy  mntgat hy gblk al id bta3 almntg
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          ` increased ${state.cartItems[itemIndex].name} cart quantity `,
          {
            position: "bottom-left",
          }
        );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 }; /// add on object product quantity
        state.cartItems.push(tempProduct);
        toast.success(`  ${action.payload.name}  added to cart `, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItem = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItems = nextCartItem;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`  ${action.payload.name}  remove from cart `, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrement(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(` decrement ${action.payload.name}  cart quantity `, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItem = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );
        state.cartItems = nextCartItem;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.error(`  ${action.payload.name}  remove from cart `, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      toast.error(`  Cart Cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotal(state, action) {
      const { total, quantity } = state.cartItems.reduce(
        (accumulator, cartItems) => {
          const { price, cartQuantity } = cartItems;
          const itemsTotal = price * cartQuantity;
          accumulator.total += itemsTotal;
          accumulator.quantity += cartQuantity;
          return accumulator;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decrement, clearCart, getTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
