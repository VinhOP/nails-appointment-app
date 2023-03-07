import { FormControlLabel, Switch, Typography } from '@mui/material';
import classNames from 'classnames/bind';
import Popper from '../../../Popper/DropdownPopper';
import styles from './OnlineBooking.module.scss';

const cx = classNames.bind(styles);

function OnlineBooking() {
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
                    control={<Switch />}
                    label={<Typography fontSize={'2.2rem'}>Mở đặt lịch trực tuyến</Typography>}
                />
            </div>
        </Popper>
    );
}

export default OnlineBooking;
