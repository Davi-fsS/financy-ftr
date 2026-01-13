import logo from "@/assets/logo.png";
import { getAvatarFallback } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export function Header(){
    const { user } = useAuthStore();

    const location = useLocation()

    const isDashboardPage = location.pathname === "/"
    const isTransactionPage = location.pathname === "/transactions"
    const isCategoryPage = location.pathname === "/categories"

    return <div className="bg-white border-2 border-solid border-b-gray-200 py-3">
        <div className="w-full flex items-center justify-between px-10">
            <img className="w-28" src={logo} alt="logo financy"/>

            <div>
                <Link to="/">
                    <Button className={!isDashboardPage ? "text-gray-600 font-normal" : ""} variant={isDashboardPage ? "link" : "ghost"}>
                        Dashboard
                    </Button>
                </Link>
                <Link to="/transactions">
                    <Button className={!isTransactionPage ? "text-gray-600 font-normal" : ""} variant={isTransactionPage ? "link" : "ghost"}>
                        Transações
                    </Button>
                </Link>
                <Link to="/categories">
                    <Button className={!isCategoryPage ? "text-gray-600 font-normal" : ""} variant={isCategoryPage ? "link" : "ghost"}>
                        Categorias
                    </Button>
                </Link>
            </div>

            <Link to="/profile">
                <Avatar className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <AvatarFallback className="text-gray-800 font-medium">{getAvatarFallback(user?.name)}</AvatarFallback>
                </Avatar>
            </Link>
        </div>
    </div>
}