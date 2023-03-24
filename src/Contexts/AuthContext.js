import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as userService from '../services/userServices';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const token = sessionStorage.getItem('userToken');
    const [isLoading, setIsLoading] = useState(false);
    const [isToken, setIsToken] = useState(!!token);
    const [accessToken, setAccessToken] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [currentProviderUser, setCurrentProviderUser] = useState();

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    useEffect(() => {
        if (!token) {
            return;
        }
        setAccessToken(token);
        setAccessToken(token);
        setTimeout(() => {
            setIsToken(!!token);
        }, 2000);
    }, [token]);

    const getCurrentUser = async () => {
        try {
            if (isToken) {
                const token = sessionStorage.getItem('userToken');
                const response = await userService.getCurrentUser(token);
                setCurrentUser(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const signup = async ({ email, password, business_type_id, first_name, last_name, phone }) => {
        try {
            setIsLoading(true);
            const response = await userService.signup({
                email,
                password,
                business_type_id,
                first_name,
                last_name,
                phone,
            });

            if (typeof response !== 'object') {
                notifyError(response);
                setIsLoading(false);
                return;
            }
            notifySuccess('Đăng ký thành công');
            setIsLoading(false);
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    const signin = async (email, password) => {
        try {
            setIsLoading(true);
            const response = await userService.signin({ email, password });

            if (typeof response !== 'object') {
                setIsLoading(false);
                notifyError(response);
                return;
            }
            notifySuccess('Đăng nhập thành công');
            sessionStorage.setItem('userToken', response.access_token);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const signinWithGoogle = async (auth, provider) => {
        try {
            console.log(auth);
            const providerResponse = await userService.signinWithGoogle(auth, provider);
            console.log(providerResponse);
            setCurrentProviderUser(providerResponse.user);

            const response = await userService.loginViaSocialAccount({
                access_token: providerResponse._tokenResponse.oauthIdToken,
                provider: 'google',
                email: providerResponse.user.email,
                first_name: providerResponse.user.displayName,
            });
            console.log(response);
            setCurrentUser(response.object);
            if (response.error) {
                notifyError(response.error);
                return response;
            }
            sessionStorage.setItem('userToken', response.access_token);
            notifySuccess('Đăng nhập thành công');
            return response;
        } catch (err) {
            console.log(err);
        }
    };

    // const signinWithFacebook = async (auth, provider) => {
    //     try {
    //         const providerResponse = await userService.signinWithFacebook(auth, provider);
    //         console.log(providerResponse);
    //         // const response = await userService.loginViaSocialAccount(providerResponse.user.accessToken, 'facebook');
    //         // console.log(response);
    //         // return response;
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const resetPassword = async (email) => {
        try {
            setIsLoading(true);
            const response = await userService.resetPassword({ email });
            if (typeof response !== 'object') {
                setIsLoading(false);
                notifyError(response);
                return;
            }
            if (response.message.includes('thất bại')) {
                setIsLoading(false);
                notifyError(response.message);
                return;
            }
            notifySuccess(`${response.message}, vui lòng kiểm tra hộp thư`);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };

    const signout = async () => {
        const response = await userService.signout(accessToken);
        sessionStorage.removeItem('userToken');
        setIsToken(false);
        setAccessToken();
    };

    const value = {
        signup,
        signin,
        signinWithGoogle,
        resetPassword,
        signout,
        isLoading,
        isToken,
        currentUser,
        getCurrentUser,
        currentProviderUser,
        accessToken,
        setAccessToken,
    };

    return (
        <AuthContext.Provider value={value} key={isToken}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
