import { createContext, useContext, useEffect, useState } from 'react';
import * as businessService from '../services/businessService';

export const useUserInfo = () => useContext(UserInfoContext);
const UserInfoContext = createContext();

function UserInfoProvider({ children }) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [businessTypes, setBusinessTypes] = useState();
    const [businessSelected, setBusinessSelected] = useState({
        id: undefined,
        value: '',
    });
    const [staffs, setStaffs] = useState([]);

    useEffect(() => {
        getBusinessTypes();
    }, []);

    const getBusinessTypes = async () => {
        try {
            const response = await businessService.types();
            setBusinessTypes(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const requiredFields = [
        {
            value: firstName,
            setToEmpty: () => {
                setFirstName('');
            },
            setToUndefined: () => {
                setFirstName();
            },
        },
        {
            value: lastName,
            setToEmpty: () => {
                setLastName('');
            },
            setToUndefined: () => {
                setLastName();
            },
        },
        {
            value: email,
            setToEmpty: () => {
                setEmail('');
            },
            setToUndefined: () => {
                setEmail();
            },
        },
        {
            value: phone,
            setToEmpty: () => {
                setPhone('');
            },
            setToUndefined: () => {
                setPhone();
            },
        },
        {
            value: password,
            setToEmpty: () => {
                setPassword('');
            },
            setToUndefined: () => {
                setPassword();
            },
        },
        {
            value: businessSelected.id,
            setToEmpty: () => {
                setBusinessSelected({ ...businessSelected, id: '' });
            },
            setToUndefined: () => {
                setBusinessSelected({ ...businessSelected, id: undefined });
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
        businessSelected,
        setBusinessSelected,
        businessTypes,
        setBusinessTypes,
        requiredFields,
        staffs,
        setStaffs,
    };
    return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}

export default UserInfoProvider;
