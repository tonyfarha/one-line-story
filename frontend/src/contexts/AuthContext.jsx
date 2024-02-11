import { createContext, useContext, useEffect, useState } from "react";
import { API_URI, LOCAL_STORAGE_USER_ITEM } from '../constants';
import { getToken, sleep } from "../utils";
import { enqueueSnackbar } from 'notistack';
import { LoadingSpinner, LinearIndeterminate } from "../components";

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoginRequestLoading, setIsLoginRequestLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const END_POINT = '/v1/users';

    useEffect(() => {
        validateToken();
    }, []);

    const validateToken = async () => {
        setIsLoading(true)
        const token = getToken();
        if (!token) {
            await sleep(0.5);
            setIsLoading(false);
            return
        };
        const res = await fetch(`${API_URI}${END_POINT}/current`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
        })
        const data = await res.json();
        if (data.email) {
            setUser(data)
            setIsAdmin(data.role === 'admin');
        }
        await sleep(0.5);
        setIsLoading(false);
    }

    const login = async ({ email, password }) => {
        setIsLoginRequestLoading(true)
        const res = await fetch(`${API_URI}${END_POINT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json();
        await sleep(0.5);
        setIsLoginRequestLoading(false)
        if (data.email) {
            setIsLoading(true)
            setUser(data)
            setIsAdmin(data.role === 'admin');
            localStorage.setItem(LOCAL_STORAGE_USER_ITEM, JSON.stringify(data))
        } else {
            enqueueSnackbar(data.msg, {
                preventDuplicate: true,
                variant: 'warning',
            })
        }
        await sleep(0.5);
        setIsLoading(false)
    }

    const logout = () => {

        localStorage.removeItem(LOCAL_STORAGE_USER_ITEM);
        setUser(null);

    }

    const contextData = {
        user,
        isAdmin,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={contextData}>
            {isLoading && <LoadingSpinner />}
            {isLoginRequestLoading && <LinearIndeterminate />}
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);
