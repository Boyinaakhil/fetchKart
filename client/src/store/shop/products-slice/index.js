import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading : false,
  productList : [],
  productDetails : null
}
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllFilteredProducts",
  async ({filterParams, sortParams}) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy : sortParams
    }).toString();
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );

    return result?.data;
  }
); 
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );

    return result?.data;
  }
); 


const shopProductSlice = createSlice({
  name:'shoppingProducts',
  initialState,
  reducers:{
    setproductDetails : (state)=>{
      state.productDetails = null;
    }
  },
  extraReducers:(bulider)=>{
    bulider.addCase(fetchAllFilteredProducts.pending,(state,action)=>{
      state.isLoading = true
    }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
      state.isLoading = false
      state.productList = action.payload.data
    }).addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
      state.isLoading = false;
      state.productList = [];
    }).addCase(fetchProductDetails.pending,(state,action)=>{
      state.isLoading = true
    }).addCase(fetchProductDetails.fulfilled,(state,action)=>{
      state.isLoading = false
      state.productDetails = action.payload.data
    }).addCase(fetchProductDetails.rejected,(state,action)=>{
      state.isLoading = false;
      state.productDetails = null;
    })
  }
})
export const {setproductDetails} = shopProductSlice.actions;
export default shopProductSlice.reducer;