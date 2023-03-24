import classNames from 'classnames/bind';
import PhoneInput from 'react-phone-number-input';
import { useUserInfo } from '../../Contexts/UserInfoContext';
import styles from './PhoneNumber.module.scss';

const cx = classNames.bind(styles);

function PhoneNumber({ onBlur }) {
    const userInfo = useUserInfo();

    return (
        <div className={cx('form-item')}>
            <label className={cx('title')}>Số điện thoại</label>
            <div className={cx('input-container')}>
                <PhoneInput
                    className={cx('input')}
                    name="phone"
                    defaultCountry="US"
                    value={userInfo.phone}
                    onChange={userInfo.setPhone}
                    onBlur={onBlur}
                />
            </div>
            {userInfo.phone?.trim().length < 1 && <p className={cx('error-notice')}> Vui lòng nhập số điện thoại</p>}
        </div>
    );
}

export default PhoneNumber;
