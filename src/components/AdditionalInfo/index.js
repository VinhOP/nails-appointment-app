import classNames from 'classnames/bind';
import styles from './AdditionalInfo.module.scss';
import Popper from '../Popper/DropdownPopper';
import InputForm from '../InputForm';
import BusinessType from '../BusinessType';
import PhoneNumber from '../PhoneNumber';
import Button from '../Button';
import { useAuth } from '../../Contexts/AuthContext';
import { useUserInfo } from '../../Contexts/UserInfoContext';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function AdditionalInfo() {
    const auth = useAuth();
    const userInfo = useUserInfo();

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(userInfo.email);
        auth.signup({ email: userInfo.email, business_type_id: userInfo.businessSelected.id, phone: userInfo.phone });
    };

    useEffect(() => {
        userInfo.setEmail(auth.currentProviderUser?.email);
    }, []);

    return (
        <Popper className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title')}>Bổ sung thông tin</div>
                <InputForm className={cx('input-form')} fixedValue value={auth.currentProviderUser?.email}>
                    Email
                </InputForm>
                <BusinessType className={cx('input-form')} />
                <PhoneNumber />
                <Button primary borderBold className={cx('submit-btn')} onClick={handleSignUp}>
                    Đăng nhập
                </Button>
            </div>
        </Popper>
    );
}
export default AdditionalInfo;
