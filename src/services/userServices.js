import * as httpsRequest from '../utilities/httpsRequest';
import { signInWithPopup } from 'firebase/auth';

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

export const signinWithGoogle = async (auth, provider) => {
    try {
        const user = await signInWithPopup(auth, provider);
        console.log(user);
    } catch (err) {
        console.log(err);
    }
};

export const resetPassword = async ({ email }) => {
    try {
        const user = await httpsRequest.post('partners/password', {
            email,
        });
        return user;
    } catch (err) {
        return err.response.data.error;
    }
};

export const signout = async (token) => {
    try {
        const user = await httpsRequest.del('sign_out', {
            headers: {
                Authorization: token,
            },
        });
    } catch (err) {}
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
