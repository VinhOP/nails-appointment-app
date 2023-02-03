import classNames from 'classnames/bind';
import Button from '../../components/Button';
import { useAuth } from '../../Contexts/AuthContext';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    const auth = useAuth();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('logout-btn')}>
                    <Button onClick={auth.signout}> Log Out </Button>
                </div>
            </div>
            <div className={cx('main-content')}>
                <div className={cx('navbar')}></div>
                <div className={cx('content')}> {children}</div>
            </div>
        </div>
    );
}

export default MainLayout;
