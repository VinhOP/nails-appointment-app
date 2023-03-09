import InputForm from '../../../InputForm';
import classNames from 'classnames/bind';
import styles from './GeneralInfo.module.scss';
import { useEffect, useState } from 'react';
import ServiceTypes from './ServiceTypes';
import Popper from '../../../Popper/DropdownPopper';
import TargetUsers from './TargetUsers';
import { useServiceInfo } from '../../../../Contexts/ServiceInfoContext';
import ServiceName from './ServiceName';
import ServiceDescription from './ServiceDescription';
const cx = classNames.bind(styles);

function GeneralInfo() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Thông tin cơ bản</h1>
            <div className={cx('info-item')}>
                <ServiceName />
            </div>
            <div className={cx('info-item')}>
                <ServiceTypes />
            </div>
            <div className={cx('info-item')}>
                <ServiceDescription />
            </div>
            <div className={cx('info-item')}>
                <TargetUsers />
            </div>
        </div>
    );
}

export default GeneralInfo;
