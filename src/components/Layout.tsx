import { useDispatch } from "react-redux";

// react-router-dom
import { Outlet, NavLink } from "react-router-dom";
import { logout } from "@/store/slices/auth-slice";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

import { Menu } from "lucide-react";

import type { AppDispatch } from "@/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function Layout() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
  };

  return (
    <div className="max-w-[1920px] mx-auto">
      <header className=" bg-black text-white px-4 md:px-14 ">
        <div className="hidden md:flex justify-between  items-center h-20">
          <div className="flex gap-4">
            <NavLink to="/" className="hover:text-red-500">
              Список лицевых счетов
            </NavLink>
            <NavLink to="/charges" className="hover:text-red-500">
              История начислений
            </NavLink>
            <NavLink to="/payments" className="hover:text-red-500">
              История платежей
            </NavLink>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4 text-black" />
            <span className="text-black">Выйти</span>
          </Button>
        </div>

        {/* Для мобильных устройств */}
        <div className="md:hidden h-20 flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="focus:outline-none  ">
                <Menu className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mt-2 fixed right-0 top-0 transform translate-x-4 translate-y-2">
              <DropdownMenuItem asChild>
                <NavLink to="/">Список ЛС</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/charges">История начислений</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/payments">История платежей</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4 text-black" />
                  <span className="text-black">Выйти</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
