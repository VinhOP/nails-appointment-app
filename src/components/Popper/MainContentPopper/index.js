import classNames from 'classnames/bind';
import styles from './MainContentPopper.module.scss';
import { useSidebar } from '../../../Contexts/SidebarContext';
import Navbar from '../../Navbar';
import Modal from '../../Modal';

const cx = classNames.bind(styles);

function MainContentPopper({ children, leftButtons, rightButtons }) {
    const sidebar = useSidebar();
    return (
        <div className={cx('main-content', { collpase: sidebar.isCollapse })}>
            <Navbar leftButtons={leftButtons} rightButtons={rightButtons} />
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default MainContentPopper;
