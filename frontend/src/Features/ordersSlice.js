import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { setHeadersAdmin, url } from "./api";
import axios from "axios";

const initialState = {
  list: [],
  status: null,
};

export const ordersFetch = createAsyncThunk("orders/ordersFetch", async () => {
  try {
    const response = await axios.get(`${url}/orders`, setHeadersAdmin());
    return response?.data;
  } catch (error) {
    console.log(error);
  }
});

export const ordersEdit = createAsyncThunk(
  "orders/ordersEdit",
  async (values, { getState }) => {
    const state = getState();
    let currentOrder = state.order.list.filter(
      (item) => item._id === values.id
    );
    const newOrder = {
      ...currentOrder[0],
      delivery_status: values.delivery_status,
    };
    console.log(newOrder.delivery_status);
    try {
      const response = await axios.put(
        `${url}/orders/${values.id}`,
        newOrder,
        setHeadersAdmin()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [ordersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [ordersFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [ordersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [ordersEdit.pending]: (state, action) => {
      state.status = "pending";
    },
    [ordersEdit.fulfilled]: (state, action) => {
      const updataOrder = state.list.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
      console.log(action.payload.id);
      state.list = updataOrder;
      state.status = "success";
    },
    [ordersEdit.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default ordersSlice.reducer;
