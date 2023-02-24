import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useSidebar } from '../../Contexts/SidebarContext';
import Button from '../Button';
import Image from '../Image';
import Menu from '../Menu';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const sidebar = useSidebar();

    return (
        <div className={cx('wrapper', { collapse: sidebar.isCollapse })}>
            <div className={cx('content', { collapse: sidebar.isCollapse })}>
                <div className={cx('header')}>
                    {!sidebar.isCollapse && (
                        <Image
                            className={cx('logo')}
                            src="https://www.biz.stg.bingobook.com/img/logo_v3.jpg"
                            alt="logo"
                        />
                    )}
                    <button className={cx('menu-btn')} onClick={sidebar.handleHideSideBar}>
                        <FontAwesomeIcon className={cx('menu-icon')} icon={faBars} />
                    </button>
                </div>
                <div className={cx('body')}>
                    <Menu isCollapse={sidebar.isCollapse} />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
