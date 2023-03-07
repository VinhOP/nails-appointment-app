import classNames from 'classnames/bind';
import { useEffect } from 'react';
import Popper from '../../../Popper/DropdownPopper';
import styles from './Staff.module.scss';
import * as staffService from '../../../../services/staffService';
import { useAuth } from '../../../../Contexts/AuthContext';
import { useUserInfo } from '../../../../Contexts/UserInfoContext';
const cx = classNames.bind(styles);

function Staff() {
    const auth = useAuth();
    const userInfo = useUserInfo();

    useEffect(() => {
        auth.accessToken && getStaffs();
    }, [auth.accessToken]);

    const getStaffs = async () => {
        const res = await staffService.getStaffs(auth.accessToken);
        userInfo.setStaffs(res.data);
    };
    return (
        <Popper className={cx('wrapper')}>
            <h1 className={cx('title')}> Nhân Viên </h1>
            <div className={cx('staff-list')}>
                {userInfo.staffs?.map((staff) => {
                    return (
                        <div key={staff.id} className={cx('staff-item')}>
                            <input className={cx('checkbox')} type="checkbox" id={staff.id} />
                            <label htmlFor={staff.id} className={cx('staff-name')}>
                                {`${staff.first_name} ${staff.last_name}`}
                            </label>
                        </div>
                    );
                })}
            </div>
        </Popper>
    );
}

export default Staff;
