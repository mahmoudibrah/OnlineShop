
import { configureStore } from '@reduxjs/toolkit'
import  productSlice  from './../Features/productSlice';
import cartSlice from '../Features/cartSlice';
import authSlice from './../Features/authSlice';
import ordersSlice from './../Features/ordersSlice';
import usersSlice from '../Features/usersSlice';





export const store = configureStore({
  reducer: {
    product : productSlice,
    order : ordersSlice, 
    cart: cartSlice,
    auth : authSlice,
    user : usersSlice,
  },

})





