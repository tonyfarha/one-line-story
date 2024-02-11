import { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LinearIndeterminate } from '../components/Loading';
import { apiRequest } from '../utils';

const UserContext = createContext({})

export const UserContextProvider = () => {
    const [isLoading, setIsLoading] = useState(false);
    const END_POINT = '/v1/users';

    const createUser = userData => apiRequest(END_POINT, 'POST', userData, setIsLoading);

    const getUsers = () => apiRequest(END_POINT, 'GET', null, setIsLoading);

    const getUser = id => apiRequest(`${END_POINT}/${id}`, 'GET', null, setIsLoading);

    const updateUser = (id, userData) => apiRequest(`${END_POINT}/${id}`, 'PUT', userData, setIsLoading);

    const deleteUser = id => apiRequest(`${END_POINT}/${id}`, 'DELETE', null, setIsLoading);

    const contextData = {
        createUser,
        isLoading,
        getUser,
        getUsers,
        updateUser,
        deleteUser
    }

    return (
        <UserContext.Provider value={contextData}>
            {isLoading && <LinearIndeterminate />}
            <Outlet />
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);
