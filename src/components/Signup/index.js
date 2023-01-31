import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import usaFlag from '../../assets/icon/united-states.png';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Popper from '../../layouts/Popper';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Signup() {
    const [isOpen, setIsOpen] = useState(false);

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
            <div className={cx('content')}>
                <div className={cx('sign-up-section')}>
                    <Popper>
                        <h1 className={cx('title')}> Create Your Free Partner Account</h1>
                        <form>
                            <div className={cx('sign-up-form')}>
                                <div className={cx('form-item')}>
                                    <label> First name </label>
                                    <div className={cx('input')}>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className={cx('form-item')}>
                                    <label> Last name </label>
                                    <div className={cx('input')}>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className={cx('form-item')}>
                                    <label> Phone Number </label>
                                    <div className={cx('input')}>
                                        <img className={cx('usa-icon')} src={usaFlag} alt={'usa-flag'} />
                                        +
                                        <input id={cx('phone-number')} type="tel" />
                                    </div>
                                </div>
                                <div className={cx('form-item')}>
                                    <label> Email </label>
                                    <div className={cx('input')}>
                                        <input id={cx('email')} type="email" />
                                    </div>
                                </div>
                                <div className={cx('form-item')}>
                                    <label> Password </label>
                                    <div className={cx('input')}>
                                        <input id={cx('password')} type="password" />
                                        <i className={cx('eye-slash-icon')}>
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        </i>
                                    </div>
                                </div>
                                <div
                                    className={cx('business-types-section', 'form-item')}
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <label> Business type </label>
                                    <div className={cx('input')}>
                                        <input type="text" disabled />
                                        <i className={cx('dropdown-icon')}>
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </i>
                                    </div>
                                    <Popper className={cx('business-container', { active: isOpen })}>
                                        <ul className={cx('business-types')}>
                                            <li className={cx('business-type')}>Beauty Salon</li>
                                            <li className={cx('business-type')}>Hair Salon</li>
                                            <li className={cx('business-type')}>Nail Salon</li>
                                        </ul>
                                    </Popper>
                                </div>
                            </div>
                        </form>
                        <div className={cx('submit-btn-container')}>
                            <input type="submit" value="Sign Up" className={cx('submit-btn')} />
                        </div>
                        <div className={cx('sign-in-option')}>
                            <span> Already have a professional account? </span>
                            <p> Sign in now </p>
                        </div>
                        <p className={cx('seperate')}> Hoặc </p>
                        <div className={cx('login-methods')}>
                            {loginMethods.map((method, i) => {
                                return (
                                    <div key={i} className={cx('btn-container')}>
                                        <button className={cx('login-method-btn')}>
                                            <i className={cx('brand-icon')}> {method.icon} </i>
                                            <p className={cx(method.style)}> Login with {method.name}</p>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </Popper>
                </div>
                <Popper>
                    <div className={cx('customer-content')}>
                        <div className={cx('title')}> Booking as a customer? </div>
                        <div className={cx('description')}>
                            Đây là khu vực đối tác, vui lòng chuyển đến
                            <span className={cx('booker-line')}> booker đăng nhập </span> để thay thế
                        </div>
                    </div>
                </Popper>
            </div>
        </div>
    );
}

export default Signup;
