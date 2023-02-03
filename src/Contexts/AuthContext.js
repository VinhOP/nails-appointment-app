import { createContext, useContext, useEffect, useState } from 'react';
import * as userService from '../services/userServices';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isToken, setIsToken] = useState(localStorage.getItem('userToken'));

    useEffect(() => {
        setIsToken(localStorage.getItem('userToken'));
    }, []);

    const signup = async (email, password, business_type_id, first_name, last_name, phone) => {
        try {
            setIsLoading(true);
            const user = await userService.signup({ email, password, business_type_id, first_name, last_name, phone });
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const signin = async (email, password) => {
        try {
            setIsLoading(true);
            const user = await userService.signin({ email, password });
            localStorage.setItem('userToken', user.access_token);
            setIsToken(true);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const signout = () => {
        localStorage.removeItem('userToken');
        setIsToken('');
    };

    const value = {
        signup,
        signin,
        signout,
        isLoading,
        isToken,
    };

    return (
        <AuthContext.Provider value={value} key={isToken}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
