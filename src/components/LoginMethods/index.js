import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './LoginMethods.module.scss';
import { provider as ggProvider } from '../../firebase/auth_google_provider_create';
import { provider as fbProvider } from '../../firebase/auth_facebook_provider_create';
import { auth as firebaseAuth } from '../../firebase/firebaseConfig';
import { useAuth } from '../../Contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function LoginMethods() {
    const auth = useAuth();
    const navigate = useNavigate();

    const loginMethods = [
        {
            name: 'Facebook',
            icon: <FontAwesomeIcon icon={faFacebook} className={cx('fb-style')} />,
            color: 'blue',
            style: 'fb-style',
            onClick: () => {},
        },
        {
            name: 'Google',
            icon: <FontAwesomeIcon icon={faGoogle} className={cx('gg-style')} />,
            color: 'red',
            style: 'gg-style',
            onClick: async () => {
                const response = await auth.signinWithGoogle(firebaseAuth, ggProvider);
                response.error &&
                    setTimeout(() => {
                        navigate('/additional-info');
                    }, 2000);
            },
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
