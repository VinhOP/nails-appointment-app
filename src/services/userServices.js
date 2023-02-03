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
        console.log(err);
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
        console.log(err);
    }
};
