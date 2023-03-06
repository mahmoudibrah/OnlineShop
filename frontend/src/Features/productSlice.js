import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeadersAdmin, url } from "./api";
import { toast } from "react-toastify";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await axios.get(`${url}/products`);
    return response?.data;
  }
);

export const productCreate = createAsyncThunk(
  "product/productCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`,
        values,
        setHeadersAdmin()
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);

export const productEdit = createAsyncThunk(
  "product/productEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`,
        values,
        setHeadersAdmin()
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
export const productDelete = createAsyncThunk(
  "product/productDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`,
        setHeadersAdmin()
      );
      return response?.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data);
    }
  }
);
const initialState = {
  items: [],
  status: null,
  erorr: null,
  createStatus: null,
  deleteStatus: null,
  editStatus: null,
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProduct.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchProduct.fulfilled]: (state, action) => {
      state.status = "succsse";
      state.items = action.payload;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productCreate.fulfilled]: (state, action) => {
      state.createStatus = "succsse";
      state.items.push(action.payload);
      toast.success("Product created");
    },
    [productCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
    },
    [productEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [productEdit.fulfilled]: (state, action) => {
      const updatedProducts = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.items = updatedProducts;
      state.editStatus = "succsse";
      toast.info("Product Edited");
    },
    [productEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
    },
    [productDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productDelete.fulfilled]: (state, action) => {
      const newList = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.items = newList;
      state.deleteStatus = "succsse";
      toast.error("Product deleted");
    },
    [productDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
    },
  },
});

export default productSlice.reducer;

// id= null => state Pacific product
// { rejectWithValue } => handel error

// async (id= null , { rejectWithValue }) => {
//   try {
//     const response = await axios.get('http://localhost:5000/productssss')
//     return response?.data
//   } catch (error) {
//     return rejectWithValue("an error occurred")
//   }
// }

//  state.erorr = action.payload
