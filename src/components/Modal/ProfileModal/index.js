import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../../Contexts/AuthContext';
import { useUserInfo } from '../../../Contexts/UserInfoContext';
import Image from '../../Image';
import InputForm from '../../InputForm';
import PhoneNumber from '../../PhoneNumber';
import Popper from '../../Popper/DropdownPopper';
import styles from './ProfileModal.module.scss';

const cx = classNames.bind(styles);

function ProfileModal() {
    const auth = useAuth();
    const userInfo = useUserInfo();

    useEffect(() => {
        userInfo.setLastName(auth.currentUser.last_name);
        userInfo.setPhone(auth.currentUser.phone);
        userInfo.setFirstName(auth.currentUser.first_name);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('item-container')}>
                    <h1 className={cx('title')}>Thông tin cá nhân</h1>
                    <Popper className={cx('container')}>
                        <div className={cx('avatar-section')}>
                            <Image className={cx('avatar')} img={auth.currentUser.photo_url} />
                            <label className={cx('description')}>Thay đổi ảnh hồ sơ</label>
                        </div>
                        <form className={cx('info-section')}>
                            <InputForm
                                type={'text'}
                                onChange={(e) => userInfo.setLastName(e.target.value)}
                                value={userInfo.lastName}
                                className={cx('input-form')}
                            >
                                Họ
                            </InputForm>
                            <PhoneNumber />
                            <InputForm
                                type={'text'}
                                onChange={(e) => userInfo.setFirstName(e.target.value)}
                                value={userInfo.firstName}
                                className={cx('input-form')}
                            >
                                Tên
                            </InputForm>
                            <InputForm readOnly fixedValue={auth.currentUser.email} className={cx('input-form')}>
                                Email
                            </InputForm>
                        </form>
                    </Popper>
                </div>
                <div className={cx('item-container')}>
                    <h1 className={cx('title')}>Đổi mật khẩu</h1>
                    <Popper className={cx('input-section')}>
                        <InputForm
                            onChange={(e) => userInfo.setCurrentPassword(e.target.value)}
                            type="password"
                            className={cx('input-form')}
                        >
                            Mật khẩu hiện tại
                        </InputForm>
                        <InputForm
                            onChange={(e) => userInfo.setPassword(e.target.value)}
                            type="password"
                            className={cx('input-form')}
                        >
                            Mật khẩu mới
                        </InputForm>
                        <InputForm
                            onChange={(e) => userInfo.setPasswordConfirm(e.target.value)}
                            type="password"
                            className={cx('input-form')}
                        >
                            Nhập lại mật khẩu
                        </InputForm>
                    </Popper>
                </div>
            </div>
        </div>
    );
}

export default ProfileModal;
