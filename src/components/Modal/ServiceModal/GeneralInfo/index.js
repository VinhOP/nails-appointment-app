import InputForm from '../../../InputForm';
import classNames from 'classnames/bind';
import styles from './GeneralInfo.module.scss';
import { useEffect, useState } from 'react';
import ServiceTypes from './ServiceTypes';
const cx = classNames.bind(styles);

function GeneralInfo() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Thông tin cơ bản</h1>
            <div className={cx('info-item')}>
                <InputForm type="text">Tên dịch vụ</InputForm>
            </div>
            <ServiceTypes />
            <div className={cx('info-item')}>
                <InputForm textArea type="text-area">
                    Mô tả dịch vụ
                </InputForm>
            </div>
            <div className={cx('info-item')}>
                <InputForm isButton readOnly placeHolder="mọi người">
                    Đối tượng sử dụng
                </InputForm>
            </div>
        </div>
    );
}

export default GeneralInfo;
