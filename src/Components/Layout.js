import Navigator from "./Navigator";
import { Outlet } from "react-router-dom";

function Layout() {
    return(
        <div>
        <Navigator/>
        <Outlet/>
        </div>
        )

}

export default Layout;