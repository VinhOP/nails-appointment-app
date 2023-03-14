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

const cx = classNames.bind(styles);

function Services() {
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();

    const humanizeDuration = require('humanize-duration');

    const serviceInfo = useServiceInfo();
    const auth = useAuth();

    useEffect(() => {
        modal ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'auto');
    }, [modal]);

    useEffect(() => {
        getCategories();

        return () => serviceInfo.setCategoriesList([]);
    }, [auth.currentUser]);

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
                <Header setModal={setModal} />
                <div className={cx('service-list')}>
                    {serviceInfo.categoriesList.map((item, i) => {
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
                                            <div key={service.id} className={cx('service-item')}>
                                                <div className={cx('title')}>{service.name}</div>
                                                <ul className={cx('rules-list')}>
                                                    {service.service_pricing_rules.map((rule) => {
                                                        return (
                                                            <li key={rule.id} className={cx('rule')}>
                                                                <div className={cx('rule-name')}>{rule.name}</div>
                                                                <div className={cx('rule-duration')}>
                                                                    {humanizeDuration(rule.duration * 60 * 1000, {
                                                                        language: 'vi',
                                                                    })}
                                                                </div>
                                                                <div className={cx('rule-price')}>{rule.price}</div>
                                                                <div className={cx('rule-special-price')}>
                                                                    {rule.special_price}$
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
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
            </div>
            <Modal modal={modal} setModal={setModal} />
            <ToastContainer hideProgressBar />
        </div>
    );
}

export default Services;
