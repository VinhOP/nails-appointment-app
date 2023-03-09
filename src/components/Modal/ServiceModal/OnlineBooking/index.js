import { FormControlLabel, Switch, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { useServiceInfo } from '../../../../Contexts/ServiceInfoContext';
import Popper from '../../../Popper/DropdownPopper';
import styles from './OnlineBooking.module.scss';

const cx = classNames.bind(styles);

function OnlineBooking() {
    const [isChecked, setIsChecked] = useState(false);
    const serviceInfo = useServiceInfo();

    const handleChecked = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        serviceInfo.handleSetServiceFields('enabled_online_booking', isChecked);
    }, [isChecked]);

    return (
        <Popper className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}> Đặt Lịch Trực Tuyến</h1>
                <p className={cx('description')}>
                    Mở tính năng đặt lịch trực tuyến, chọn nhân viên sẵn sàng cho dịch vụ và thêm một mô tả ngắn gọn.
                </p>
            </div>
            <hr className={cx('spliter')} />
            <div className={cx('body')}>
                <FormControlLabel
                    className={cx('form-item')}
                    control={<Switch checked={isChecked} onClick={handleChecked} />}
                    label={<Typography fontSize={'2.2rem'}>Mở đặt lịch trực tuyến</Typography>}
                />
            </div>
        </Popper>
    );
}

export default OnlineBooking;
