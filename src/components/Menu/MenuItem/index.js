import {
    faBriefcase,
    faCalendar,
    faChevronDown,
    faGear,
    faGift,
    faIdCardClip,
    faQuestionCircle,
    faUser,
    faUserGroup,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '../../Button';
import styles from './MenuItem.module.scss';
import calender from '../../../assets/icons/calender.svg';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);

function MenuItem() {
    const menuList = [
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
            rightIcon: <FontAwesomeIcon className={cx('right-icon')} icon={faChevronDown} />,
        },
        {
            name: 'Group',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faUserGroup} />,
        },
        {
            name: 'Invite',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faUserPlus} />,
        },
        {
            name: 'Help & Support',
            leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faQuestionCircle} />,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            {menuList.map((item) => {
                return (
                    <div className={cx('menu-item')}>
                        <Button className={cx('item-btn')} leftIcon={item.leftIcon} rightIcon={item.rightIcon}>
                            <span className={cx('title')}>{item.name}</span>
                        </Button>
                    </div>
                );
            })}
        </div>
    );
}

export default MenuItem;
