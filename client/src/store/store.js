import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index.js';
import productReducer from './admin/product-slice/index.js';
import shopProductSlice from './shop/products-slice/index.js';
import shopCartSlice from "./shop/cart-slice/index.js";
import shopAddressSlice from './shop/address-slice/index.js';
import shopOrderSlice from './shop/order-slice/index.js';
import adminOrderSlice from './admin/order-slice/index.js';
import shopSearchSlice from './shop/search-slice/index.js';
import shopReviewSlice from './shop/review-slice/index.js';
import commonSlice from './common-slice/index.js';
const store = configureStore({
  reducer: {
    auth : authReducer,
    product : productReducer,
    shopProduct : shopProductSlice,
    shopCart : shopCartSlice,
    shopAddress : shopAddressSlice,
    shopOrder : shopOrderSlice,
    adminOrder : adminOrderSlice,
    shopSearch : shopSearchSlice,
    shopReview : shopReviewSlice,
    commonFeature : commonSlice,
  }
})

export default store;