import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '../Button';
import Image from '../Image';
import Menu from '../Menu';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const [isHide, setIsHide] = useState(false);
    const handleHideSideBar = () => {
        setIsHide(!isHide);
    };
    return (
        <div className={cx('wrapper', { hide: isHide })}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <Image className={cx('logo')} src="https://www.biz.stg.bingobook.com/img/logo_v3.jpg" alt="logo" />
                    <button className={cx('menu-btn')}>
                        <FontAwesomeIcon className={cx('menu-icon')} icon={faBars} onClick={handleHideSideBar} />
                    </button>
                </div>
                <div className={cx('body')}>
                    <Menu />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
