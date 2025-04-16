import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  isAuthenticated: false,
  isLoading : true,
  user: null
}

export const registerUser = createAsyncThunk('auth/register',
  async(formData) =>{
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      formData,
      {withCredentials: true}
    );
    return response.data;
  }
)
export const loginUser = createAsyncThunk('auth/login',
  async(formData) =>{
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      formData,
      {withCredentials: true}
    );
    return response.data;
  }
)
export const logoutUser = createAsyncThunk('auth/logout',
  async() =>{
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      {withCredentials: true}
    );
    return response.data;
  }
)
export const checkAuth = createAsyncThunk('auth/checkAuth',
  async() =>{
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/user`,
      {withCredentials: true,
       headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        Expires : '0',
      }
    }
    );
    return response.data;
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsers: (state, action) => {
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(registerUser.pending,(state)=>{
      state.isLoading = true
    }).addCase(registerUser.fulfilled,(state,action)=>
    {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    }).addCase(registerUser.rejected,(state,action)=>
      {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        console.error("Registration Error:", action.error.message);  // Log error
      alert("Registration failed. Please try again.");  // Show alert to user
      
      }).addCase(loginUser.pending,(state)=>{
        state.isLoading = true
      }).addCase(loginUser.fulfilled,(state,action)=>
      {
        state.isLoading = false;
        state.user = action.payload.success ?  action.payload.user : null;
        state.isAuthenticated = action.payload.success ? true : false;
      }).addCase(loginUser.rejected,(state,action)=>
        {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
          console.error("Registration Error:", action.error.message);  // Log error
        alert("Registration failed. Please try again.");  // Show alert to user
        })
        .addCase(checkAuth.pending,(state)=>{
          state.isLoading = true
        }).addCase(checkAuth.fulfilled,(state,action)=>
        {
          state.isLoading = false;
          state.user = action.payload.success ?  action.payload.user : null;
          state.isAuthenticated = action.payload.success ? true : false;
        }).addCase(checkAuth.rejected,(state,action)=>
          {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
            console.error("Registration Error:", action.error.message);  // Log error
          // alert("Registration failed. Please try again.");  // Show alert to user
          })
        .addCase(logoutUser.fulfilled,(state,action)=>
          {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated =false;
          })
  }

});


export const {setUsers} = authSlice.actions;
export default authSlice.reducer;