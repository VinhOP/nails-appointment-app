import classNames from 'classnames/bind';
import styles from './Signin.module.scss';
import Popper from '../../layouts/Popper';
import InputForm from '../InputForm';

const cx = classNames.bind(styles);

function Signin() {
    return (
        <div className={cx('wrapper')}>
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
                        <div className={cx('form-item')}></div>
                    </div>
                </form>
            </Popper>
        </div>
    );
}

export default Signin;
