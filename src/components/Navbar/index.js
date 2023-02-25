import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../../Contexts/SidebarContext';
import Button from '../Button';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar() {
    const [title, setTitle] = useState('');
    const sidebar = useSidebar();
    const location = useLocation();

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
                <h1 className={cx('title')}> {title} </h1>
                <Button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
                <Button className={cx('notify-btn')}>
                    <FontAwesomeIcon icon={faBell} />
                </Button>
            </div>
        </header>
    );
}

export default Navbar;
