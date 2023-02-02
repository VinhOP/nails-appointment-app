import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}></div>
            <div className={cx('main-content')}>
                <div className={cx('navbar')}></div>
                <div className={cx('content')}> {children}</div>
            </div>
        </div>
    );
}

export default MainLayout;
