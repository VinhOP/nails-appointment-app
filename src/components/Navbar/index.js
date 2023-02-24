import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useSidebar } from '../../Contexts/SidebarContext';
import Button from '../Button';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar() {
    const sidebar = useSidebar();

    return (
        <header className={cx('wrapper', { collapse: sidebar.isCollapse })}>
            <div className={cx('content')}>
                <h1 className={cx('title')}> Lịch hẹn </h1>
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
