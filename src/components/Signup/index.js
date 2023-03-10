import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import Popper from '../Popper/DropdownPopper';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../InputForm';
import LoginMethods from '../LoginMethods';
import { useUserInfo } from '../../Contexts/UserInfoContext';
import { useAuth } from '../../Contexts/AuthContext';
import 'react-phone-number-input/style.css';
import Spinner from '../Spinner';
import { ToastContainer } from 'react-toastify';
import BusinessType from '../BusinessType';
import PhoneNumber from '../PhoneNumber';

const cx = classNames.bind(styles);

function Signup() {
    const userInfo = useUserInfo();
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            userInfo.requiredFields.forEach((field) => {
                field.setToUndefined();
            });
        };
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        userInfo.requiredFields.forEach((field) => {
            !field.value && field.setToEmpty();
        });
        if (userInfo.requiredFields.every((field) => field.value)) {
            const signup = await auth.signup(
                userInfo.email,
                userInfo.password,
                userInfo.businessSelected.id,
                userInfo.firstName,
                userInfo.lastName,
                userInfo.phone,
            );
            signup &&
                setTimeout(() => {
                    navigate('/signin');
                }, 2000);
        }
    };

    const handleOnBlur = (e) => {
        switch (e.target.name) {
            case 'firstname':
                !userInfo.firstName && userInfo.setFirstName('');
                break;
            case 'lastname':
                !userInfo.lastName && userInfo.setLastName('');
                break;
            case 'phone':
                !userInfo.phone && userInfo.setPhone('');
                break;
            case 'email':
                !userInfo.email && userInfo.setEmail('');
                break;
            case 'password':
                !userInfo.password && userInfo.setPassword('');
                break;
            default:
                break;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('sign-up-section')}>
                    <Popper>
                        <h1 className={cx('title')}> T???o t??i kho???n ?????i t??c mi???n ph?? </h1>
                        <form>
                            <div className={cx('sign-up-form')}>
                                <div className={cx('form-item')}>
                                    <InputForm
                                        type="text"
                                        name="firstname"
                                        value={userInfo.firstName}
                                        onChange={(e) => userInfo.setFirstName(e.target.value)}
                                        onBlur={handleOnBlur}
                                    >
                                        H???
                                    </InputForm>
                                    {userInfo.firstName?.trim().length < 1 && (
                                        <p className={cx('error-notice')}> Vui l??ng nh???p h???</p>
                                    )}
                                </div>
                                <div className={cx('form-item')}>
                                    <InputForm
                                        type="text"
                                        name="lastname"
                                        onChange={(e) => userInfo.setLastName(e.target.value)}
                                        onBlur={handleOnBlur}
                                    >
                                        T??n
                                    </InputForm>
                                    {userInfo.lastName?.trim().length < 1 && (
                                        <p className={cx('error-notice')}> Vui l??ng nh???p t??n</p>
                                    )}
                                </div>
                                <PhoneNumber onBlur={handleOnBlur} />
                                <div className={cx('form-item')}>
                                    <InputForm
                                        type="email"
                                        name="email"
                                        onChange={(e) => userInfo.setEmail(e.target.value)}
                                        onBlur={handleOnBlur}
                                    >
                                        Email
                                    </InputForm>
                                    {userInfo.email?.trim().length < 1 && (
                                        <p className={cx('error-notice')}> Vui l??ng nh???p email c???a b???n</p>
                                    )}
                                </div>
                                <div className={cx('form-item')}>
                                    <InputForm
                                        type="password"
                                        name="password"
                                        onChange={(e) => userInfo.setPassword(e.target.value)}
                                        onBlur={handleOnBlur}
                                    >
                                        M???t kh???u
                                    </InputForm>
                                    {userInfo.password?.trim().length < 1 && (
                                        <p className={cx('error-notice')}> Vui l??ng nh???p m???t kh???u</p>
                                    )}
                                </div>
                                <BusinessType />
                            </div>
                            <div className={cx('submit-btn-container')}>
                                <Button
                                    type="submit"
                                    className={cx('submit-btn')}
                                    primary
                                    borderBold
                                    disabled={auth.isLoading}
                                    onClick={handleRegister}
                                >
                                    {auth.isLoading ? <Spinner /> : '????ng k??'}
                                </Button>
                            </div>
                        </form>
                        <div className={cx('sign-in-option')}>
                            <span> ???? c?? m???t t??i kho???n chuy??n nghi???p? </span>
                            <Link to={'/signin'} className={cx('sign-in-btn')}>
                                <p> ????ng nh???p ngay</p>
                            </Link>
                        </div>
                        <LoginMethods />
                    </Popper>
                </div>
                <div className={cx('customer-section')}>
                    <Popper>
                        <div className={cx('title')}> Booking as a customer? </div>
                        <div className={cx('description')}>
                            ????y l?? khu v???c ?????i t??c, vui l??ng chuy???n ?????n
                            <span className={cx('booker-line')}> booker ????ng nh???p </span> ????? thay th???
                        </div>
                    </Popper>
                </div>
            </div>
            <ToastContainer position="bottom-right" hideProgressBar />
        </div>
    );
}

export default Signup;
