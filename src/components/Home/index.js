import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { useSidebar } from '../../Contexts/SidebarContext';

const cx = classNames.bind(styles);

function Home() {
    const auth = useAuth();
    // const sidebar = useSidebar();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isToken) {
            navigate('/signup');
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h1> Home Page</h1>
        </div>
    );
}

export default Home;
