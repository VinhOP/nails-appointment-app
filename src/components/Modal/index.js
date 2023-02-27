import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useSidebar } from '../../Contexts/SidebarContext';
import Navbar from '../Navbar';
import MainContentPopper from '../Popper/MainContentPopper';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ modal, setModal }) {
    const sidebar = useSidebar();
    const leftButtons = [
        {
            icon: <FontAwesomeIcon icon={faClose} />,
            onClick: () => {
                setModal(false);
            },
        },
    ];
    return (
        <div className={cx('wrapper', { collapse: sidebar.isCollapse, active: modal })}>
            <MainContentPopper leftButtons={leftButtons}>Modal</MainContentPopper>
        </div>
    );
}

export default Modal;
