import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts";

export const Protect = () => {

    const { user } = useAuthContext();

    return user ? <Outlet /> : <Navigate to='login' />

}
