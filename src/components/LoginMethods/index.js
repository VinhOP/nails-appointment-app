import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './LoginMethods.module.scss';

const cx = classNames.bind(styles);

function LoginMethods() {
    const loginMethods = [
        {
            name: 'Facebook',
            icon: <FontAwesomeIcon icon={faFacebook} className={cx('fb-style')} />,
            color: 'blue',
            style: 'fb-style',
        },
        {
            name: 'Google',
            icon: <FontAwesomeIcon icon={faGoogle} className={cx('gg-style')} />,
            color: 'red',
            style: 'gg-style',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <p className={cx('seperate')}> Hoặc </p>
            <div className={cx('login-methods')}>
                {loginMethods.map((method, i) => {
                    return (
                        <div key={i} className={cx('btn-container')}>
                            <Button className={cx('login-method-btn')} leftIcon={method.icon}>
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