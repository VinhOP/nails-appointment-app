import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './LoginMethods.module.scss';
import * as userService from '../../services/userServices';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { provider } from '../../firebase/auth_google_provider_create';
import { auth } from '../../firebase/firebaseConfig';

const cx = classNames.bind(styles);

function LoginMethods() {
    const loginMethods = [
        {
            name: 'Facebook',
            icon: <FontAwesomeIcon icon={faFacebook} className={cx('fb-style')} />,
            color: 'blue',
            style: 'fb-style',
            onClick: () => {
                userService.signinWithGoogle(auth, provider);
            },
        },
        {
            name: 'Google',
            icon: <FontAwesomeIcon icon={faGoogle} className={cx('gg-style')} />,
            color: 'red',
            style: 'gg-style',
            onClick: () => {},
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <p className={cx('seperate')}> Hoặc </p>
            <div className={cx('login-methods')}>
                {loginMethods.map((method, i) => {
                    return (
                        <div key={i} className={cx('btn-container')}>
                            <Button className={cx('login-method-btn')} leftIcon={method.icon} onClick={method.onClick}>
                                <p className={cx(method.style)}> Đăng nhập bằng {method.name}</p>
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LoginMethods;
