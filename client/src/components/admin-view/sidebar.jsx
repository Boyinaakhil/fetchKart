import { Fragment } from "react";
import { ChartNoAxesCombined } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBasket, BadgeCheck } from "lucide-react";
import { SheetHeader } from "../ui/sheet";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";
const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    id: 'products',
    name: 'products',
    path: '/admin/products',
    icon : <ShoppingBasket />
  },
  {
    id: 'orders',
    name: 'orders',
    path: '/admin/orders',
    icon : <BadgeCheck />
  }
]

function MenuItems({setOpen}) {
  const navigate = useNavigate();

  return(
    <nav className="mt-8 flex-col flex gap-2">
      {
        adminSidebarMenuItems.map(item=>
          <div key={item.id}
           onClick={()=>{
            navigate(item.path);
             setOpen ? setOpen(false): null;
             }}
             className ="flex text-xl cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            {item.icon}
            <span>
              {item.name}
            </span>

          </div>
        )
      }
    </nav>
  );
}

function AdminSideBar({open, setOpen}){
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className ="border-b">
              <SheetTitle className = "flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30}/>
                <h1 className = "text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className = "hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div onClick = {()=>navigate('/admin/dashboard')} className = "flex cursor-pointer items-center gap-2">
          <ChartNoAxesCombined size={30}/>
          <h1 className = "text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}
export default AdminSideBar;