import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useState } from 'react';
import { useUserInfo } from '../../Contexts/UserInfoContext';
import Popper from '../Popper/DropdownPopper';
import styles from './BusinessType.module.scss';

const cx = classNames.bind(styles);

function BusinessType({ className }) {
    const [isOpen, setIsOpen] = useState(false);
    const userInfo = useUserInfo();

    const businessTypeModalRef = useRef();

    const handleSetBusiness = (type) => {
        userInfo.setBusinessSelected({ ...userInfo.businessSelected, id: type.id, value: type.name });
    };

    const classes = cx('business-types-section', 'form-item', {
        [className]: className,
    });
    return (
        <div className={classes} onClick={() => setIsOpen(!isOpen)} ref={businessTypeModalRef}>
            <label> Loại hình kinh doanh </label>
            <div className={cx('input-container')}>
                <input type="text" value={userInfo.businessSelected.value} disabled />
                <i className={cx('dropdown-icon')}>
                    <FontAwesomeIcon icon={faCaretDown} />
                </i>
            </div>
            <Popper className={cx('business-container', { active: isOpen })}>
                {userInfo.businessTypes?.map((type) => {
                    return (
                        <input
                            type="button"
                            className={cx('business-type')}
                            onClick={() => handleSetBusiness(type)}
                            value={type.name}
                            key={type.id}
                        />
                    );
                })}
            </Popper>
            {userInfo.businessSelected.id?.length < 1 && (
                <p className={cx('error-notice')}> Vui lòng chọn hình thức kinh doanh</p>
            )}
        </div>
    );
}

export default BusinessType;
