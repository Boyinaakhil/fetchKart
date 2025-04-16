import React from 'react'
import { SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import UserCartItemsContent from './cart-items-content';
import { useNavigate } from 'react-router-dom';
function UserCartWrapper({cartItems, setOpenCartSheet}) {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
          Review your items and proceed to checkout.
        </SheetDescription>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {/* Cart items would go here */
        cartItems && cartItems.length > 0 ?
        cartItems.map(item=> <UserCartItemsContent cartItem = {item} />)
        : <div className="text-center text-muted-foreground">Your cart is empty.</div>
        }

      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button onClick = {()=>{
        navigate("/shop/checkout");
        setOpenCartSheet(false);

      }} className="w-full mt-6">Checkout</Button>
    </SheetContent>
  )
}

export default UserCartWrapper;
