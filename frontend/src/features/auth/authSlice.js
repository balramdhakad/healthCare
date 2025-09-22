import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleLoginUser, handleSignupUser } from "./authService";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userdata: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    logOutUser : (state,action)=>{
      state.userdata = null
      localStorage.removeItem("user")
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userdata = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.message = "Login successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || action.error.message;
        state.userdata = null;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.userdata = action.payload
        state.message = "Signup successful!";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || action.error.message;
      });
  },
});

export const loginUser = createAsyncThunk(
  "AUTH/LOGIN",
  async (formData, thunkApi) => {
    try {
      const response = await handleLoginUser(formData);
      return response;
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const signupUser = createAsyncThunk(
  "AUTH/SIGNUP",
  async (formData, thunkApi) => {
    try {
      const response = await handleSignupUser(formData);
      return response;
    } catch (error) {
      const message = error?.response?.data?.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);


export const {logOutUser} = authSlice.actions
export default authSlice.reducer;
