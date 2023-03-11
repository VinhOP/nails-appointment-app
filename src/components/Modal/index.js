import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useServiceInfo } from '../../Contexts/ServiceInfoContext';
import { useSidebar } from '../../Contexts/SidebarContext';
import Navbar from '../Navbar';
import styles from './Modal.module.scss';
import ServiceModal from './ServiceModal';

const cx = classNames.bind(styles);

function Modal({ modal, setModal }) {
    const sidebar = useSidebar();
    const serviceInfo = useServiceInfo();
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
            name: 'Save',
            buttonStyle: true,
            onClick: () => {
                serviceInfo.handleSaveService();
            },
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
            <div className={cx('main-content')}>
                <div className={cx('modal')}>
                    <ServiceModal />
                </div>
            </div>
        </div>
    );
}

export default Modal;
