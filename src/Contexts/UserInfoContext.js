import { createContext, useContext, useState } from 'react';

export const useUserInfo = () => useContext(UserInfoContext);
const UserInfoContext = createContext();

function UserInfoProvider({ children }) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [business, setBusiness] = useState();
    const [businessID, setBusinessID] = useState();

    const requiredFields = [
        {
            value: firstName,
            setToEmpty: () => {
                setFirstName('');
            },
        },
        {
            value: lastName,
            setToEmpty: () => {
                setLastName('');
            },
        },
        {
            value: email,
            setToEmpty: () => {
                setEmail('');
            },
        },
        {
            value: phone,
            setToEmpty: () => {
                setPhone('');
            },
        },
        {
            value: password,
            setToEmpty: () => {
                setPassword('');
            },
        },
        {
            value: business,
            setToEmpty: () => {
                setBusiness('');
            },
        },
    ];

    const value = {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        phone,
        setPhone,
        email,
        setEmail,
        password,
        setPassword,
        business,
        setBusiness,
        businessID,
        setBusinessID,
        requiredFields,
    };
    return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}

export default UserInfoProvider;
