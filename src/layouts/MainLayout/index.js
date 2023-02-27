import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faClose, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import MainContentPopper from '../../components/Popper/MainContentPopper';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../Contexts/AuthContext';
import { useSidebar } from '../../Contexts/SidebarContext';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    const auth = useAuth();
    const navigate = useNavigate();
    const rightButtons = [
        {
            icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
            onClick: () => {},
        },
        {
            icon: <FontAwesomeIcon icon={faBell} />,
            onClick: () => {},
        },
    ];

    useEffect(() => {
        auth.getCurrentUser();
        if (!auth.isToken) {
            navigate('/signup');
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <MainContentPopper rightButtons={rightButtons}>{children}</MainContentPopper>
        </div>
    );
}

export default MainLayout;
