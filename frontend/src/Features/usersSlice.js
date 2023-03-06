import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeadersAdmin, url } from "./api";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  status: null,
  deleteStatus: null,
};

export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
  try {
    const respons = await axios.get(`${url}/users`, setHeadersAdmin());
    return respons?.data;
  } catch (error) {
    console.log(error);
  }
});

export const userDelete = createAsyncThunk("users/userDelete", async (id) => {
  try {
    const respons = await axios.delete(`${url}/users/${id}`, setHeadersAdmin());
    console.log(respons?.data);
    return respons?.data;
  } catch (error) {
    console.log(error);
    toast.error(error.respons?.data, {
      position: "bottom-left",
    });
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [usersFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [usersFetch.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.status = "success";
    },
    [usersFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [userDelete.pending]: (state, action) => {
      state.status = "pending";
    },
    [userDelete.fulfilled]: (state, action) => {
      const newList = state.list.filter(
        (user) => user._id !== action.payload._id
      );
      state.list = newList
      state.deleteStatus = "success"
      state.status = "success";
      toast.error("User Deleted!", {
        position: "bottom-left",
      });
    },
    [userDelete.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export default usersSlice.reducer;
