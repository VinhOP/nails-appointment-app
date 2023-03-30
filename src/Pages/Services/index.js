import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import Header from './Header';
import styles from './Services.module.scss';
import * as businessService from '../../services/businessService';
import { useAuth } from '../../Contexts/AuthContext';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import 'react-loading-skeleton/dist/skeleton.css';
import DropDownMenu from './DropDownMenu';
import { useServiceInfo } from '../../Contexts/ServiceInfoContext';
import { ToastContainer } from 'react-toastify';
import ServicePricingRules from './ServicePricingRules';
import { useModal } from '../../Contexts/ModalContext';
import ServiceModal from '../../components/Modal/ServiceModal';
import { useUserInfo } from '../../Contexts/UserInfoContext';

const cx = classNames.bind(styles);

function Services() {
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [isEditModal, setIsEditModal] = useState(false);

    const serviceInfo = useServiceInfo();
    const auth = useAuth();
    const modal = useModal();
    const userInfo = useUserInfo();

    useEffect(() => {
        !modal.profileModal && getCategories();
    }, [auth.currentUser]);

    useEffect(() => {
        modal.setProfileModal(false);

        return () => {
            serviceInfo.setCategoriesList([]);
        };
    }, []);

    const getCategories = async () => {
        try {
            const res = await serviceInfo.getCategories(page);
            setPage(res.pagination.next);
            setCount(res.pagination.count);
            serviceInfo.setCategoriesList([...serviceInfo.categoriesList, ...res.data]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <Navbar title="Dịch vụ" />
            </div>
            <div className={cx('content')}>
                <Header setIsEditModal={setIsEditModal} />
                {serviceInfo.categoriesList.length >= 1 ? (
                    <div className={cx('service-list')}>
                        {serviceInfo.categoriesList?.map((item, i) => {
                            return (
                                <div key={item.id} className={cx('service-container')}>
                                    <div className={cx('header')}>
                                        <div className={cx('service-type')}>
                                            <h5>{item.name}</h5>
                                        </div>
                                        <div className={cx('actions')}>
                                            <DropDownMenu category={item} index={i} />
                                        </div>
                                    </div>
                                    <div className={cx('service-body')}>
                                        {item.services.length < 1 && <div className={cx('service-item')}> Trống </div>}
                                        {item.services.map((service) => {
                                            return (
                                                <ServicePricingRules
                                                    service={service}
                                                    modal={modal}
                                                    setModal={modal.setModal}
                                                    setIsEditModal={setIsEditModal}
                                                    key={service.id}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                        {serviceInfo.categoriesList.length > 0 && serviceInfo.categoriesList.length < count && (
                            <div className={cx('footer')}>
                                <Button
                                    className={cx('more-btn')}
                                    primary
                                    disabled={serviceInfo.isLoading}
                                    onClick={getCategories}
                                >
                                    {serviceInfo.isLoading ? <Spinner /> : 'Xem thêm'}
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className={cx('empty-notice')}> Danh sách trống, thêm mới loại dịch vụ ngay </p>
                )}
            </div>
            {modal.serviceModal && (
                <Modal
                    title="Thêm mới một dịch vụ"
                    modal={modal.modal}
                    setModal={modal.setModal}
                    isEdit={isEditModal}
                    setIsEdit={setIsEditModal}
                    isService
                >
                    <ServiceModal />
                </Modal>
            )}
        </div>
    );
}

export default Services;
