import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetTokenAndCredentials } from "../../store/auth-slice/index.js";
import { logoutUser } from "../../store/auth-slice/index.js";
function AdminHeader({setOpen}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    // dispatch(logoutUser())
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate('/auth/login');
  }
  return (
    <header className = "flex items-center justify-between px-4 py-3 bg-background border-b ">
      <Button onClick = {()=>setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={()=>handleLogout()} className ="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>

    </header>
  );
}
export default AdminHeader;