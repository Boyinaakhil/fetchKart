import { HousePlug, LogOut, ShoppingCart, User, UserCog } from 'lucide-react'
import React, { use } from 'react'
import { Link } from 'react-router-dom'
import { SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { Sheet } from '../ui/sheet'
import { useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuLabel } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenuSeparator } from '../ui/dropdown-menu'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser, resetTokenAndCredentials } from '@/store/auth-slice'
import UserCartWrapper from './cart-wrapper.jsx';
import { fetchCartItems } from '@/store/shop/cart-slice'
import { useEffect } from 'react'
import { Label } from '../ui/label'
import { useLocation } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'


function MenuItems(){
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  function handleNavigate(getCurrentMenuItem){
    sessionStorage.removeItem("filters");
    const currentFilter = 
      getCurrentMenuItem.id !== 'home' && getCurrentMenuItem.id !== 'products' && getCurrentMenuItem.id !== "search" ? {
        category : [getCurrentMenuItem.id]
      } : null
    
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    console.log("Saved filters:", JSON.parse(sessionStorage.getItem("filters")))
    location.pathname.includes('listing') && currentFilter !== null ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
    : navigate(getCurrentMenuItem.path);


  }
  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
    {
      shoppingViewHeaderMenuItems.map((menuItem)=><Label
      onClick={()=>  handleNavigate(menuItem)}
       key = {menuItem.id}className = "text-sm font-medium cursor-pointer">
        {menuItem.label} 
      </Label>)
    }
  </nav>

}

function HeadersRightContent(){
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    // dispatch(logoutUser())
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate('/auth/login');
  }
  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  },[dispatch]);


  return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
    <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
      <Button onClick={()=>setOpenCartSheet(true)} variant='outline' size='icon' 
        className="relative"
        >
      <ShoppingCart className='h-6 w-6' />
      <span className='absolute top-[-5px] right-[2px] font-semibold text-sm'>{cartItems?.items?.length || 0}</span>
      <span className='sr-only'>User Cart</span>
    </Button>
    <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems = {cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items :[] }/>


    </Sheet>
    
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="bg-black">
          <AvatarFallback className="bg-black text-white font-extrabold">
            {user?.userName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side = "right" >
        <DropdownMenuLabel>
          Logged in as {user?.userName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/shop/account')}>
          <UserCog className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
}

function ShoppingHeader() {
  const { isAuthenticated , user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeadersRightContent/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        {
          <div className="hidden lg:block">
            <HeadersRightContent/>
          </div>
        }
      </div>
    </header>
  );
}

export default ShoppingHeader;