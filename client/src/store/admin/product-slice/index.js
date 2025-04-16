import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading : false,
  productList: []
};

export const addProduct = createAsyncThunk('adminProduct/addNewProducts',
  async(formData)=>{
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        }
      },
      {withCredentials: true}
    );
    return result?.data;
  }
)
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`    );
    return result?.data;
  }
);
export const editProduct = createAsyncThunk('adminProduct/editProduct',
  async({id, formData})=>{
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        }
      },
      {withCredentials: true}
    );
    return result?.data;
  }
)
export const deleteProduct = createAsyncThunk('adminProduct/deleteProduct',
  async(id)=>{
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        }
      },
      {withCredentials: true}
    );
    return result?.data;
  }
)


const AdminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers:{},
  extraReducers: (bulider)=>{
    bulider.addCase(fetchAllProducts.pending, (state)=>{
      state.isLoading = true;
    }).addCase(fetchAllProducts.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.productList = action.payload.data;
    }).addCase(fetchAllProducts.rejected, (state)=>{
      state.isLoading = false;
      state.productList = [];
    });

  },
});
export default AdminProductSlice.reducer;