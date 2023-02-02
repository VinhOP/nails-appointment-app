import * as httpsRequest from '../utilities/httpsRequest';

export const signup = async ({ email, password, business_type_id }) => {
    try {
        const user = await httpsRequest.post('partners/sign_up', {
            email,
            password,
            business_type_id,
        });
        return user;
    } catch (err) {
        console.log(err);
    }
};
