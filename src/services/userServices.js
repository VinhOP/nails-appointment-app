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
        return user;
    } catch (err) {
        return err;
    }
};

export const signinWithFacebook = async (auth, provider) => {
    try {
        const user = await signInWithPopup(auth, provider);
        return user;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const loginViaSocialAccount = async ({ access_token, provider, email, first_name }) => {
    try {
        const response = await httpsRequest.post('partners/login_via_social_account', {
            access_token,
            provider,
            email,
            first_name,
        });
        return response;
    } catch (err) {
        return err.response.data;
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
        const user = await httpsRequest.del('partners/sign_out', {
            headers: {
                Authorization: token,
            },
        });
        return user;
    } catch (err) {
        console.log(err);
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

export const editUserInfo = async ({
    token,
    first_name,
    last_name,
    email,
    phone,
    current_password,
    password,
    password_confirmation,
}) => {
    try {
        const user = await httpsRequest.put(
            'partners/me',
            {
                first_name,
                last_name,
                email,
                phone,
                current_password,
                password,
                password_confirmation,
            },
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return user;
    } catch (err) {
        return err;
    }
};

export const createPhotoURL = async ({ attachment }) => {
    try {
        const res = await httpsRequest.post('attachments/photo', {
            attachment,
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const getPhoto = async (photoUrl) => {
    try {
        const res = await httpsRequest.get(photoUrl);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const uploadPhoto = async (attachmentUrl, file) => {
    try {
        const res = await httpsRequest.put(attachmentUrl, file, {
            headers: {
                'Content-Type': file && file.type,
            },
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};
