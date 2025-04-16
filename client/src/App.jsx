import React from "react";
import "./index.css"; // Ensure index.css is imported
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout.jsx";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import AdminLayout from "./components/admin-view/layout.jsx";
import AdminDashboard from "./pages/admin-view/dashboard.jsx";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import PaypalReturnPage from "./pages/shopping-view/paypal-return"
import SearchProducts from "./pages/shopping-view/search";
import CheckAuth from "./components/common/check-auth.jsx";
import UnauthPage from "./pages/unauth-page";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/index.js";
import { Skeleton } from "@/components/ui/skeleton"
import PaymentSuccessPage from "./pages/shopping-view/payment-success";



function App() {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem('token'));
    dispatch(checkAuth(token)); 
  }
  , [dispatch]);
  if (isLoading) {
    return (
      <Skeleton className="w-[800] h-[600px] bg-black" />
      // You can replace this with a more complex skeleton or loading spinner
      // depending on your design requirements.
    );
  }
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" 
          element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>}
        />
        <Route path="auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path="/shop" element = {
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path = "checkout" element = {<ShoppingCheckout/>} />
          <Route path = "account" element = {<ShoppingAccount/>} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element = {<UnauthPage/>} />
      </Routes>
    </div>
  );
}

export default App;

// This is a simple React component that uses Tailwind CSS for styling.
// It creates a centered card with a title, description, and a button.