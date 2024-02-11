import { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LinearIndeterminate } from '../components/Loading';
import { apiRequest } from '../utils';

const StoryContext = createContext({})

export const StoryContextProvider = () => {
    const [isLoading, setIsLoading] = useState(false);
    const END_POINT = '/v1/stories';

    const createStory = storyData => apiRequest(END_POINT, 'POST', storyData, setIsLoading);

    const getStories = () => apiRequest(END_POINT, 'GET', null, setIsLoading);

    const getStory = id => apiRequest(`${END_POINT}/${id}`, 'GET', null, setIsLoading);

    const updateStory = (id, storyData) => apiRequest(`${END_POINT}/${id}`, 'PUT', storyData, setIsLoading);

    const deleteStory = id => apiRequest(`${END_POINT}/${id}`, 'DELETE', null, setIsLoading);

    const contextData = {
        createStory,
        isLoading,
        getStory,
        getStories,
        updateStory,
        deleteStory
    }

    return (
        <StoryContext.Provider value={contextData}>
            {isLoading && <LinearIndeterminate />}
            <Outlet />
        </StoryContext.Provider>
    )
}

export const useStoryContext = () => useContext(StoryContext);
