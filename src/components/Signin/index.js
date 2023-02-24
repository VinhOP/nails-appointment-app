import classNames from 'classnames/bind';
import styles from './Signin.module.scss';
import Popper from '../../layouts/Popper';
import InputForm from '../InputForm';
import Button from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import LoginMethods from '../LoginMethods';
import { useUserInfo } from '../../Contexts/UserInfoContext';
import { useAuth } from '../../Contexts/AuthContext';
import { useEffect } from 'react';
import Spinner from '../Spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Signin() {
    const userInfo = useUserInfo();
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        userInfo.requiredFields.forEach((field) => {
            !field.value && field.setToEmpty();
        });
        if (userInfo.email && userInfo.password) {
            await auth.signin(userInfo.email, userInfo.password);
        }
    };

    useEffect(() => {
        if (auth.isToken) {
            navigate('/appointment');
        }
        return () => {
            userInfo.requiredFields.forEach((field) => {
                field.setToUndefined();
            });
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Popper>
                    <h1 className={cx('title')}> Đăng nhập tài khoản đối tác miễn phí </h1>
                    <form>
                        <div className="sign-in-form">
                            <div className={cx('form-item')}>
                                <InputForm
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={(e) => userInfo.setEmail(e.target.value)}
                                >
                                    ID Hộp thư
                                </InputForm>
                                {userInfo.email === '' && (
                                    <p className={cx('error-notice')}> Vui lòng nhập email của bạn</p>
                                )}
                            </div>
                            <div className={cx('form-item')}>
                                <InputForm
                                    type="password"
                                    id="password"
                                    onChange={(e) => userInfo.setPassword(e.target.value)}
                                >
                                    Mật khẩu
                                </InputForm>
                                {userInfo.password === '' && (
                                    <p className={cx('error-notice')}> Vui lòng nhập mật khẩu của bạn</p>
                                )}
                            </div>
                        </div>
                        <Button
                            className={cx('submit-btn')}
                            submit
                            disabled={auth.isLoading}
                            type="submit"
                            onClick={handleSignIn}
                        >
                            {auth.isLoading ? <Spinner /> : 'Đăng nhập'}
                        </Button>
                    </form>
                    <div className={cx('actions')}>
                        <div className={cx('action-item')}>
                            <input id="save-info" className={cx('checkbox')} type="checkbox" />
                            <label for="save-info">Lưu thông tin đăng nhập</label>
                        </div>
                        <div className={cx('action-item')}>
                            <Link to="/reset-password" className={cx('reset-password-btn')}>
                                <i> Quên mật khẩu? </i>
                            </Link>
                        </div>
                    </div>
                    <div className={cx('sign-in-option')}>
                        <span>Chưa có một tài khoản chuyên nghiệp? </span>
                        <Link to={'/signup'} className={cx('sign-in-btn')}>
                            <p> Đăng ký ngay</p>
                        </Link>
                    </div>
                    <LoginMethods />
                </Popper>
            </div>
            <ToastContainer position="bottom-right" hideProgressBar />
        </div>
    );
}

export default Signin;
