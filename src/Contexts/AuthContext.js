import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as userService from '../services/userServices';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isToken, setIsToken] = useState(!!localStorage.getItem('userToken'));
    const [currentUser, setCurrentUser] = useState();

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    useEffect(() => {
        setIsToken(!!localStorage.getItem('userToken'));
    }, []);

    const getCurrentUser = async () => {
        try {
            if (isToken) {
                const token = localStorage.getItem('userToken');
                const response = await userService.getCurrentUser(token);
                setCurrentUser(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const signup = async (email, password, business_type_id, first_name, last_name, phone) => {
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
            notifySuccess('Đăng nhập thành cônggi');
            localStorage.setItem('userToken', response.access_token);
            setIsLoading(false);
            setTimeout(() => {
                setIsToken(true);
            }, 2000);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    };

    const signout = () => {
        localStorage.removeItem('userToken');
        setIsToken(false);
    };

    const value = {
        signup,
        signin,
        signout,
        isLoading,
        isToken,
        currentUser,
        getCurrentUser,
    };

    return (
        <AuthContext.Provider value={value} key={isToken}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
