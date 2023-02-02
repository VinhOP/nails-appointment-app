import { createContext, useContext, useState } from 'react';
import * as userService from '../services/userServices';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    const signup = async (email, password, business_type_id) => {
        try {
            setIsLoading(true);
            const user = await userService.signup({ email, password, business_type_id });
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const value = {
        signup,
        isLoading,
        currentUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
