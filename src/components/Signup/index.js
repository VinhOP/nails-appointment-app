import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import usaFlag from '../../assets/icon/united-states.png';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Popper from '../../layouts/Popper';
import { useState } from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';
import InputForm from '../InputForm';
import LoginMethods from '../LoginMethods';

const cx = classNames.bind(styles);

function Signup() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('sign-up-section')}>
                    <Popper>
                        <h1 className={cx('title')}> Tạo tài khoản đối tác miễn phí </h1>
                        <form>
                            <div className={cx('sign-up-form')}>
                                <div className={cx('form-item')}>
                                    <InputForm type="text"> Họ </InputForm>
                                </div>
                                <div className={cx('form-item')}>
                                    <InputForm type="text"> Tên </InputForm>
                                </div>
                                <div className={cx('form-item')}>
                                    <label>Số điện thoại</label>
                                    <div className={cx('input')}>
                                        <img className={cx('usa-icon')} src={usaFlag} alt={'usa-flag'} />
                                        +
                                        <input id={cx('phone-number')} type="tel" />
                                    </div>
                                </div>
                                <div className={cx('form-item')}>
                                    <InputForm type="email"> Email </InputForm>
                                </div>
                                <div className={cx('form-item')}>
                                    <InputForm type="password"> Mật khẩu </InputForm>
                                </div>
                                <div
                                    className={cx('business-types-section', 'form-item')}
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <label> Loại hình kinh doanh </label>
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
                            <Button type="submit" className={cx('submit-btn')} submit>
                                Đăng ký
                            </Button>
                        </div>
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
        </div>
    );
}

export default Signup;
