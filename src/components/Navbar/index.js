import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../../Contexts/SidebarContext';
import Button from '../Button';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar({ leftButtons = false, rightButtons = false }) {
    const [title, setTitle] = useState('');
    const sidebar = useSidebar();
    const location = useLocation();

    // const props = {
    //     onClick,
    // };

    useEffect(() => {
        switch (location.pathname) {
            case '/services':
                setTitle('Dịch vụ');
                break;
            case '/appointment':
                setTitle('Lịch hẹn');
                break;
            case '/client-management':
                setTitle('Khách Hàng');
                break;
            case '/staff':
                setTitle('Nhân viên');
                break;
            default:
                setTitle('Tính năng này đang được phát triển');
                break;
        }
    }, [location.pathname]);

    return (
        <header className={cx('wrapper', { collapse: sidebar.isCollapse })}>
            <div className={cx('content')}>
                {leftButtons && (
                    <span className={cx('btn-container')}>
                        {leftButtons.map((button) => {
                            return (
                                <Button onClick={button.onClick} className={cx('button')}>
                                    {button.icon}
                                </Button>
                            );
                        })}
                    </span>
                )}
                <h1 className={cx('title')}> {title} </h1>
                {rightButtons && (
                    <span className={cx('btn-container')}>
                        {rightButtons.map((button) => {
                            return (
                                <Button onClick={button.onClick} className={cx('button')}>
                                    {button.icon}
                                </Button>
                            );
                        })}
                    </span>
                )}
            </div>
        </header>
    );
}

export default Navbar;
