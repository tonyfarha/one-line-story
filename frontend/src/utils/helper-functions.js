import { LOCAL_STORAGE_USER_ITEM } from '../constants';

export const sleep = (s) => new Promise(resolve => setTimeout(resolve, s * 1000));
export const getToken = () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_ITEM))?.token || null;
