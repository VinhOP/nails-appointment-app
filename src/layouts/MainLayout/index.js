import classNames from 'classnames/bind';
import Button from '../../components/Button';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../Contexts/AuthContext';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    const auth = useAuth();

    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('main-content')}>
                <div className={cx('navbar')}></div>
                <div className={cx('content')}> {children}</div>
            </div>
        </div>
    );
}

export default MainLayout;
