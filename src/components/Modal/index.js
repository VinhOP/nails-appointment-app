import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useServiceInfo } from '../../Contexts/ServiceInfoContext';
import { useSidebar } from '../../Contexts/SidebarContext';
import Navbar from '../Navbar';
import styles from './Modal.module.scss';
import ServiceModal from './ServiceModal';

const cx = classNames.bind(styles);

function Modal({ modal, setModal, isEdit = false, setIsEdit }) {
    const sidebar = useSidebar();
    const serviceInfo = useServiceInfo();

    const handleSubmit = async () => {
        if (isEdit) {
            await serviceInfo.handleEditService();
            setModal(false);
            return;
        } else {
            if (serviceInfo.serviceFields.name.trim() && serviceInfo.serviceFields.category_id) {
                await serviceInfo.handleSaveService();
                setModal(false);
            }
        }
    };

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
            onClick: handleSubmit,
        },
    ];

    useEffect(() => {
        return () => {
            serviceInfo.setServiceFields({
                id: '',
                name: '',
                category_id: '',
                category_name: '',
                description: '',
                service_available_for: '',
                enabled_online_booking: false,
                service_pricing_rules: [
                    {
                        name: '',
                        duration: 1800000,
                        price: '0',
                        price_type: 'fixed',
                        special_price: '0',
                    },
                ],
                staffs: [],
            });
            setIsEdit(false);
            serviceInfo.setError(false);
        };
    }, []);

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
            <ToastContainer hideProgressBar />
        </div>
    );
}

export default Modal;
