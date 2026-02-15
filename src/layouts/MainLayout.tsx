import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";


function MainLayout() {
    return <>
        <div className="flex h-screen">
            <Sidebar />
            <div className="p-4 w-full">
                <Outlet />
            </div>
        </div>
    </>;
}

export default MainLayout;