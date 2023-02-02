import classNames from 'classnames/bind';
import styles from './Signin.module.scss';
import Popper from '../../layouts/Popper';
import InputForm from '../InputForm';
import Button from '../Button';
import { Link } from 'react-router-dom';
import LoginMethods from '../LoginMethods';

const cx = classNames.bind(styles);

function Signin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Popper>
                    <h1 className={cx('title')}> Đăng nhập tài khoản đối tác miễn phí </h1>
                    <form>
                        <div className="sign-in-form">
                            <div className={cx('form-item')}>
                                <InputForm type="email"> ID Hộp thư</InputForm>
                            </div>
                            <div className={cx('form-item')}>
                                <InputForm type="password"> Mật khẩu </InputForm>
                            </div>
                        </div>
                    </form>
                    <Button submit> Đăng nhập </Button>
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
        </div>
    );
}

export default Signin;
