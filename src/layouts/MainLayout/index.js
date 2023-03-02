import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../Contexts/AuthContext';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ children, title }) {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        auth.getCurrentUser();
        if (!auth.isToken) {
            navigate('/signup');
        }
    }, []);

    return (
        <>
            {auth.isToken && (
                <div className={cx('wrapper')}>
                    <Sidebar />
                    {children}
                </div>
            )}
        </>
    );
}

export default MainLayout;
