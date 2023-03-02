import classNames from 'classnames/bind';
import Button from '../Button';
import InputForm from '../InputForm';
import styles from './ResetPassword.module.scss';
import Popper from '../Popper/DropdownPopper';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { useUserInfo } from '../../Contexts/UserInfoContext';
import Spinner from '../Spinner';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function ResetPassword() {
    const auth = useAuth();
    const userInfo = useUserInfo();

    const handleSendPasswordReset = async (e) => {
        e.preventDefault();
        !userInfo.email && userInfo.setEmail('');
        if (userInfo.email) {
            await auth.resetPassword(userInfo.email);
        }
    };

    useEffect(() => {
        return () => {
            userInfo.setEmail();
        };
    }, []);
    return (
        <>
            <Popper className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>Đặt lại mật khẩu của bạn</div>
                    <InputForm type="email" name="email" onChange={(e) => userInfo.setEmail(e.target.value)}>
                        Email
                    </InputForm>
                    {userInfo.email === '' && <p className={cx('error-notice')}> Vui lòng nhập email của bạn</p>}
                    <Button
                        className={cx('submit-btn')}
                        primary
                        disabled={auth.isLoading}
                        type="submit"
                        onClick={handleSendPasswordReset}
                    >
                        {auth.isLoading ? <Spinner /> : 'Gửi mật khẩu mới'}
                    </Button>
                    <div className={cx('navigate-section')}>
                        <span>Không muốn reset password?</span>
                        <Link className={cx('navigate-btn')} to={'/signin'}>
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </Popper>
            <ToastContainer position="bottom-right" hideProgressBar />
        </>
    );
}

export default ResetPassword;
