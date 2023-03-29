import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import {
    faBriefcase,
    faCalendar,
    faChevronLeft,
    faGear,
    faGift,
    faHeadphones,
    faIdCardClip,
    faLanguage,
    faQuestionCircle,
    faRightFromBracket,
    faUser,
    faUserGroup,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import MenuItem from './MenuItem';
import {
    faCalendarCheck,
    faCreditCard,
    faLightbulb,
    faMessage,
    faUserCircle,
} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import Image from '../Image';
import { useAuth } from '../../Contexts/AuthContext';
import { useModal } from '../../Contexts/ModalContext';
import Modal from '../Modal';
import ProfileModal from '../Modal/ProfileModal';
import { useUserInfo } from '../../Contexts/UserInfoContext';

const cx = classNames.bind(styles);
function Menu({ isCollapse }) {
    const auth = useAuth();
    const modal = useModal();
    const userInfo = useUserInfo();
    const [menuList, setMenuList] = useState();

    useEffect(() => {
        setMenuList([
            {
                name: 'Lịch hẹn',
                url: '/appointment',
                leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faCalendar} />,
                isOpen: false,
            },
            {
                name: 'Khách hàng',
                url: '/client-management',
                leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faIdCardClip} />,
            },
            {
                name: 'Dịch vụ',
                url: '/services',
                leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faBriefcase} />,
            },
            {
                name: 'Nhân viên',
                url: '/staff',
                leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faUser} />,
            },
            {
                name: 'Gift Card',
                url: '/gift-card',
                leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faGift} />,
            },
            {
                name: 'Set Up',
                url: '/set-up',
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
                        url: '/smart-campaign',
                    },
                    {
                        name: 'Blast Messages',
                        leftIcon: <FontAwesomeIcon icon={faMessage} />,
                        url: '/blast-messages',
                    },
                    {
                        name: 'Đặt lịch trực tuyến',
                        leftIcon: <FontAwesomeIcon icon={faCalendarCheck} />,
                        url: '/online-booking',
                    },
                    {
                        name: 'Social Media',
                        leftIcon: <FontAwesomeIcon icon={faFacebook} />,
                        url: '/social-media',
                    },
                    {
                        name: 'Card Processing',
                        leftIcon: <FontAwesomeIcon icon={faCreditCard} />,
                        url: '/card-processing',
                    },
                ],
                isOpen: false,
            },
            {
                name: 'Group',
                url: '/group',
                leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faUserGroup} />,
            },
            {
                name: 'Invite',
                url: '/invite',
                leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faUserPlus} />,
            },
            {
                name: 'Help & Support',
                leftIcon: <FontAwesomeIcon className={cx('left-icon')} icon={faQuestionCircle} />,
                url: '/help',
            },
            {
                name: `${auth.currentUser?.first_name || ''} ${auth.currentUser?.last_name || ''}`,
                leftIcon: <Image src={userInfo.photo || auth.currentUser?.photo_url} alt="avatar" />,
                rightIcon: <FontAwesomeIcon icon={faChevronLeft} />,
                children: [
                    {
                        name: 'Hồ sơ',
                        leftIcon: <FontAwesomeIcon icon={faUserCircle} />,
                        profile: () => {
                            modal.setModal(true);
                            modal.setProfileModal(true);
                        },
                    },
                    {
                        name: 'Liên hệ hỗ trợ',
                        leftIcon: <FontAwesomeIcon icon={faHeadphones} />,
                    },
                    {
                        name: 'Ngôn ngữ ',
                        leftIcon: <FontAwesomeIcon icon={faLanguage} />,
                    },
                    {
                        name: 'Đăng xuất',
                        leftIcon: <FontAwesomeIcon icon={faRightFromBracket} />,
                        logOut: () => auth.signout(),
                    },
                ],
            },
        ]);
    }, [auth.currentUser]);

    return (
        <div className={cx('wrapper')}>
            {modal.profileModal && (
                <Modal title="My Profile" isProfile>
                    <ProfileModal />
                </Modal>
            )}
            <MenuItem isCollapse={isCollapse} menuList={menuList} setMenuList={setMenuList} />
        </div>
    );
}

export default Menu;
