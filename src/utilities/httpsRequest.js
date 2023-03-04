import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, headers = {}, option = {}) => {
    const respone = await request.get(path, headers, option);
    return respone.data;
};

export const post = async (path, body = {}, headers = {}, option = {}) => {
    const respone = await request.post(path, body, headers, option);
    return respone.data;
};

export const del = async (path, headers = {}) => {
    const respone = await request.delete(path, headers);
    return respone.data;
};

export default request;
