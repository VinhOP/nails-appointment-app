import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useSidebar } from '../../Contexts/SidebarContext';
import Button from '../Button';
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

    const rightIcons = [
        {
            icon: 'Save',
            buttonStyle: true,
        },
    ];

    return (
        <div className={cx('wrapper', { collapseSize: sidebar.isCollapse, activeSize: modal })}>
            <Navbar
                title="Thêm mới một dịch vụ"
                mediumHeight
                modal={modal}
                isModal
                leftButtons={leftButtons}
                rightIcons={rightIcons}
            />
            <div className={cx('main-content')}> Modal </div>
        </div>
    );
}

export default Modal;
