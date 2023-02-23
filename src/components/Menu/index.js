import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import {
    faBriefcase,
    faCalendar,
    faChevronDown,
    faChevronLeft,
    faGear,
    faGift,
    faIdCardClip,
    faQuestionCircle,
    faUser,
    faUserGroup,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import MenuItem from './MenuItem';
import {
    faCalendarCheck,
    faCheckCircle,
    faCreditCard,
    faLightbulb,
    faMessage,
} from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Menu() {
    const [menuList, setMenuList] = useState([
        {
            name: 'Lịch hẹn',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faCalendar} />,
        },
        {
            name: 'Khách hàng',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faIdCardClip} />,
        },
        {
            name: 'Dịch vụ',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faBriefcase} />,
        },
        {
            name: 'Nhân viên',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faUser} />,
        },
        {
            name: 'Gift Card',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faGift} />,
        },
        {
            name: 'Set Up',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faGear} />,
        },
        {
            name: 'Tiếp thị',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faYoutube} />,
            rightIcon: <FontAwesomeIcon className={cx('right-icon')} icon={faChevronLeft} />,
            children: [
                {
                    name: 'Smart Campaign',
                    leftIcon: <FontAwesomeIcon icon={faLightbulb} />,
                },
                {
                    name: 'Blast Messages',
                    leftIcon: <FontAwesomeIcon icon={faMessage} />,
                },
                {
                    name: 'Đặt lịch trực tuyến',
                    leftIcon: <FontAwesomeIcon icon={faCalendarCheck} />,
                },
                {
                    name: 'Social Media',
                    leftIcon: <FontAwesomeIcon icon={faFacebook} />,
                },
                {
                    name: 'Card Processing',
                    leftIcon: <FontAwesomeIcon icon={faCreditCard} />,
                },
            ],
            isOpen: false,
        },
        {
            name: 'Group',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faUserGroup} />,
        },
        {
            name: 'Invite',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faUserPlus} />,
            rightIcon: <FontAwesomeIcon className={cx('right-icon')} icon={faChevronLeft} />,
            children: [
                {
                    name: 'Smart Campaign',
                    leftIcon: <FontAwesomeIcon icon={faLightbulb} />,
                },
                {
                    name: 'Blast Messages',
                    leftIcon: <FontAwesomeIcon icon={faMessage} />,
                },
                {
                    name: 'Đặt lịch trực tuyến',
                    leftIcon: <FontAwesomeIcon icon={faCalendarCheck} />,
                },
                {
                    name: 'Social Media',
                    leftIcon: <FontAwesomeIcon icon={faFacebook} />,
                },
                {
                    name: 'Card Processing',
                    leftIcon: <FontAwesomeIcon icon={faCreditCard} />,
                },
            ],
            isOpen: false,
        },
        {
            name: 'Help & Support',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faQuestionCircle} />,
        },
    ]);
    return (
        <div className={cx('wrapper')}>
            <MenuItem menuList={menuList} setMenuList={setMenuList} />
        </div>
    );
}

export default Menu;
