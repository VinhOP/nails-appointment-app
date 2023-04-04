import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useLayoutEffect, useRef, useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../../Contexts/AuthContext';
import { useModal } from '../../Contexts/ModalContext';
import { useServiceInfo } from '../../Contexts/ServiceInfoContext';
import { useSidebar } from '../../Contexts/SidebarContext';
import { useUserInfo } from '../../Contexts/UserInfoContext';
import Navbar from '../Navbar';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ isEdit = false, setIsEdit, children, title, isService = false, isProfile = false }) {
    const sidebar = useSidebar();
    const serviceInfo = useServiceInfo();
    const modal = useModal();
    const userInfo = useUserInfo();
    const auth = useAuth();

    const handleSubmit = async () => {
        if (isProfile) {
            if (userInfo.password || userInfo.passwordConfirm) {
                if (userInfo.password !== userInfo.passwordConfirm) {
                    return;
                }
            }
            userInfo.setIsLoading(true);
            if (userInfo.photoBlob) {
                const res = await userInfo.createPhotoURL(auth.currentUser.id);
                await userInfo.uploadPhoto(res.attachment.attachment_url);
                userInfo.setIsLoading(false);
            }
            await userInfo.changeUserInfo();
            await auth.getCurrentUser();
            userInfo.setPhotoBlob();
            userInfo.setIsLoading(false);
            return;
        }

        if (isEdit) {
            await serviceInfo.handleEditService();
            modal.setModal(false);
            return;
        } else {
            if (serviceInfo.serviceFields.name.trim() && serviceInfo.serviceFields.category_id) {
                if (
                    serviceInfo.serviceFields.service_pricing_rules.every(
                        (rules) => !/^\d+$/.test(rules.price) || !/^\d+$/.test(rules.special_price),
                    )
                ) {
                    return;
                }
                await serviceInfo.handleSaveService();
                modal.setModal(false);
            }
        }
    };

    const leftButtons = [
        {
            icon: <FontAwesomeIcon icon={faClose} />,
            onClick: () => {
                if (isProfile) {
                    modal.setProfileModal(false);
                    return;
                }
                isService && modal.setServiceModal(false);
                modal.setModal(false);
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
        document.body.style.overflowY = 'hidden';

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
                        price: 0,
                        price_type: 'fixed',
                        special_price: 0,
                    },
                ],
                staffs: [],
            });
            setIsEdit && setIsEdit(false);
            serviceInfo.setError(false);
            document.body.style.overflowY = 'auto';
        };
    }, []);

    return (
        <div
            className={cx('wrapper', {
                collapseSize: sidebar.isCollapse,
                activeSize: modal.modal,
                isProfile: isProfile,
            })}
        >
            <Navbar
                title={title}
                mediumHeight
                modal={modal.modal}
                isModal
                leftButtons={leftButtons}
                rightIcons={rightIcons}
            />
            <div className={cx('main-content')}>
                <div className={cx('modal')}>{children}</div>
            </div>
            <ToastContainer hideProgressBar />
        </div>
    );
}

export default Modal;
