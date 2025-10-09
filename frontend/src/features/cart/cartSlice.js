import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  handleFetchCart,
  handleUpdateQuantity,
  handleRemoveItem,
  handleAddToCart,
} from "./cartService";


const cartSlice = createSlice({
  name: "cart",
  initialState : {
  cartItems: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
},
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});




export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.userdata?.token;
    return await handleFetchCart(token);
  }
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }, thunkApi) => {
    const token = thunkApi.getState().auth.userdata?.token;
    return await handleAddToCart(token, productId, quantity);
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/update",
  async ({ productId, quantity }, thunkApi) => {
    const token = thunkApi.getState().auth.userdata?.token;
    return await handleUpdateQuantity(token, productId, quantity);
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/remove",
  async (productId, thunkApi) => {
    const token = thunkApi.getState().auth.userdata?.token;
    return await handleRemoveItem(token, productId);
  }
);



export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
