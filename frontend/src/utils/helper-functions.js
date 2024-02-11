import { LOCAL_STORAGE_USER_ITEM } from '../constants';
import { enqueueSnackbar } from 'notistack';
import { API_URI } from '../constants';

export const sleep = (s) => new Promise(resolve => setTimeout(resolve, s * 1000));

export const getToken = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_ITEM))?.token || null;

export const apiRequest = async (url, method, data = null, setLoading = null) => {
    try {
        const token = getToken();
        if (setLoading) setLoading(true);

        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const res = await fetch(`${API_URI}${url}`, options);

        if (!res.ok) {
            const jsonData = await res.json();
            enqueueSnackbar(jsonData.msg, {
                preventDuplicate: true,
                variant: res.ok ? 'success' : 'error',
            });
            return false;
        }

        const jsonData = await res.json();

        if (jsonData.msg) {
            enqueueSnackbar(jsonData.msg, {
                preventDuplicate: true,
                variant: 'success',
            });
        }

        return method === 'GET' ? jsonData : true;
    } catch (error) {
        enqueueSnackbar('An error occurred. Please try again later', {
            preventDuplicate: true,
            variant: 'error',
        });
        return false;
    } finally {
        if (setLoading) {
            await sleep(0.5);
            setLoading(false);
        }
    }
};
