import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as businessService from '../services/businessService';
import * as userService from '../services/userServices';
import { useAuth } from './AuthContext';

export const useUserInfo = () => useContext(UserInfoContext);
const UserInfoContext = createContext();

function UserInfoProvider({ children }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [currentPassword, setCurrentPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [businessTypes, setBusinessTypes] = useState();
    const [businessSelected, setBusinessSelected] = useState({
        id: undefined,
        value: '',
    });
    const [staffs, setStaffs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState();
    const [photoBlob, setPhotoBlob] = useState();
    const [file, setFile] = useState();

    useEffect(() => {
        getBusinessTypes();
    }, []);

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const token = sessionStorage.getItem('userToken');

    const getBusinessTypes = async () => {
        try {
            const response = await businessService.types();
            setBusinessTypes(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const changeUserInfo = async () => {
        try {
            const res = await userService.editUserInfo({
                token,
                first_name: firstName,
                phone: phone,
                last_name: lastName,
                current_password: currentPassword,
                password: password || null,
                password_confirmation: passwordConfirm || null,
            });
            if (res.response?.data?.error) {
                notifyError(res.response.data.error);
                return;
            }
            res.message && notifySuccess(res.message);
        } catch (err) {
            console.log(err);
        }
    };

    const getPhoto = async (photoURL) => {
        try {
            await userService.getPhoto(photoURL);
        } catch (err) {
            console.log(err);
        }
    };

    const createPhotoURL = async (userID) => {
        try {
            const res = await userService.createPhotoURL({
                attachment: {
                    photoable_id: userID,
                    photoable_type: 'Partner',
                },
            });
            return res;
        } catch (err) {
            console.log(err);
        }
    };

    const uploadPhoto = async (attachment_url) => {
        try {
            const res = await userService.uploadPhoto(attachment_url, file);
            console.log(res);
            return res;
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
        changeUserInfo,
        currentPassword,
        passwordConfirm,
        setCurrentPassword,
        setPasswordConfirm,
        uploadPhoto,
        file,
        setFile,
        getPhoto,
        photoBlob,
        setPhotoBlob,
        isLoading,
        setIsLoading,
        photo,
        setPhoto,
        createPhotoURL,
    };
    return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}

export default UserInfoProvider;
