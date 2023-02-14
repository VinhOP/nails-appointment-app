import * as httpsRequest from '../utilities/httpsRequest';

export const signup = async ({ email, password, business_type_id, first_name, last_name, phone }) => {
    try {
        const user = await httpsRequest.post('partners/sign_up', {
            email,
            password,
            business_type_id,
            first_name,
            last_name,
            phone,
        });
        return user;
    } catch (err) {
        return err.response.data.error;
    }
};

export const signin = async ({ email, password }) => {
    try {
        const user = await httpsRequest.post('partners/sign_in', {
            email,
            password,
        });
        return user;
    } catch (err) {
        return err.response.data.error;
    }
};

export const getCurrentUser = async (token) => {
    try {
        const user = await httpsRequest.get('partners/me', {
            headers: {
                Authorization: token,
            },
        });
        return user.object;
    } catch (err) {
        console.log(err);
    }
};
