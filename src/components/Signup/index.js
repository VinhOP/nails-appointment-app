import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import usaFlag from '../../assets/icon/united-states.png';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Popper from '../../layouts/Popper';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import InputForm from '../InputForm';
import LoginMethods from '../LoginMethods';
import { useUserInfo } from '../../Contexts/UserInfoContext';
import { useAuth } from '../../Contexts/AuthContext';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Spinner from '../Spinner';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function Signup() {
    const [isOpen, setIsOpen] = useState(false);

    const userInfo = useUserInfo();
    const auth = useAuth();
    const navigate = useNavigate();

    const businessTypeModalRef = useRef();

    useEffect(() => {
        return () => {
            userInfo.requiredFields.forEach((field) => {
                field.setToUndefined();
            });
        };
    }, []);

    const handleSetBusiness = (e) => {
        userInfo.setBusiness(e.target.value);
        switch (e.target.value) {
            case 'Beauty Salon':
                userInfo.setBusinessID('1');
                break;
            case 'Hair Salon':
                userInfo.setBusinessID('2');
                break;
            case 'Nail Salon':
                userInfo.setBusinessID('3');
                break;
            default:
                break;
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        userInfo.requiredFields.forEach((field) => {
            !field.value && field.setToEmpty();
        });
        if (userInfo.requiredFields.every((field) => field.value)) {
            const signup = await auth.signup(
                userInfo.email,
                userInfo.password,
                userInfo.businessID,
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
                        <h1 className={cx('title')}> Tạo tài khoản đối tác miễn phí </h1>
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
                                        Họ
                                    </InputForm>
                                    {userInfo.firstName?.trim().length < 1 && (
                                        <p className={cx('error-notice')}> Vui lòng nhập họ</p>
                                    )}
                                </div>
                                <div className={cx('form-item')}>
                                    <InputForm
                                        type="text"
                                        name="lastname"
                                        onChange={(e) => userInfo.setLastName(e.target.value)}
                                        onBlur={handleOnBlur}
                                    >
                                        Tên
                                    </InputForm>
                                    {userInfo.lastName?.trim().length < 1 && (
                                        <p className={cx('error-notice')}> Vui lòng nhập tên</p>
                                    )}
                                </div>
                                <div className={cx('form-item')}>
                                    <label>Số điện thoại</label>
                                    <div className={cx('input-container')}>
                                        <PhoneInput
                                            id={cx('phone-number')}
                                            name="phone"
                                            defaultCountry="US"
                                            value={userInfo.phone}
                                            onChange={userInfo.setPhone}
                                            onBlur={handleOnBlur}
                                        />
                                    </div>
                                    {userInfo.phone?.trim().length < 1 && (
                                        <p className={cx('error-notice')}> Vui lòng nhập số điện thoại</p>
                                    )}
                                </div>
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
                                        <p className={cx('error-notice')}> Vui lòng nhập email của bạn</p>
                                    )}
                                </div>
                                <div className={cx('form-item')}>
                                    <InputForm
                                        type="password"
                                        name="password"
                                        onChange={(e) => userInfo.setPassword(e.target.value)}
                                        onBlur={handleOnBlur}
                                    >
                                        Mật khẩu
                                    </InputForm>
                                    {userInfo.password?.trim().length < 1 && (
                                        <p className={cx('error-notice')}> Vui lòng nhập mật khẩu</p>
                                    )}
                                </div>
                                <div
                                    className={cx('business-types-section', 'form-item')}
                                    onClick={() => setIsOpen(!isOpen)}
                                    ref={businessTypeModalRef}
                                >
                                    <label> Loại hình kinh doanh </label>
                                    <div className={cx('input-container')}>
                                        <input type="text" value={userInfo.business} disabled />
                                        <i className={cx('dropdown-icon')}>
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </i>
                                    </div>
                                    <Popper className={cx('business-container', { active: isOpen })}>
                                        <ul className={cx('business-types')}>
                                            <input
                                                type="button"
                                                className={cx('business-type')}
                                                onClick={handleSetBusiness}
                                                value="Beauty Salon"
                                            />
                                            <input
                                                type="button"
                                                className={cx('business-type')}
                                                onClick={handleSetBusiness}
                                                value="Hair Salon"
                                            />
                                            <input
                                                type="button"
                                                className={cx('business-type')}
                                                onClick={handleSetBusiness}
                                                value="Nail Salon"
                                            />
                                        </ul>
                                    </Popper>
                                    {userInfo.business?.trim().length < 1 && (
                                        <p className={cx('error-notice')}> Vui lòng chọn hình thức kinh doanh</p>
                                    )}
                                </div>
                            </div>
                            <div className={cx('submit-btn-container')}>
                                <Button
                                    type="submit"
                                    className={cx('submit-btn')}
                                    submit
                                    disabled={auth.isLoading}
                                    onClick={handleRegister}
                                >
                                    {auth.isLoading ? <Spinner /> : 'Đăng ký'}
                                </Button>
                            </div>
                        </form>
                        <div className={cx('sign-in-option')}>
                            <span> Đã có một tài khoản chuyên nghiệp? </span>
                            <Link to={'/signin'} className={cx('sign-in-btn')}>
                                <p> Đăng nhập ngay</p>
                            </Link>
                        </div>
                        <LoginMethods />
                    </Popper>
                </div>
                <div className={cx('customer-section')}>
                    <Popper>
                        <div className={cx('title')}> Booking as a customer? </div>
                        <div className={cx('description')}>
                            Đây là khu vực đối tác, vui lòng chuyển đến
                            <span className={cx('booker-line')}> booker đăng nhập </span> để thay thế
                        </div>
                    </Popper>
                </div>
            </div>
            <ToastContainer position="bottom-right" hideProgressBar />
        </div>
    );
}

export default Signup;
