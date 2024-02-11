import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts";

export const AdminRoutes = () => {

    const { isAdmin } = useAuthContext();

    return isAdmin ? <Outlet /> : <Navigate to='/' />

}
