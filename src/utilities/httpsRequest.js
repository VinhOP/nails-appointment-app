import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, option = {}) => {
    const respone = await request.get(path, option);
    return respone.data;
};

export const post = async (path, body = {}, option = {}) => {
    const respone = await request.post(path, body, option);
    return respone.data;
};

// export const delete = async() => {
//     const respone = await request.delete(path,headers,option)
//     return respone.data;
// }

export default request;
