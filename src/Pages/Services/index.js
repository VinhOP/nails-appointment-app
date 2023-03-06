import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import Header from './Header';
import styles from './Services.module.scss';
import * as businessService from '../../services/businessService';
import { useAuth } from '../../Contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import 'react-loading-skeleton/dist/skeleton.css';
import { useUserInfo } from '../../Contexts/UserInfoContext';

const cx = classNames.bind(styles);

function Services() {
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const humanizeDuration = require('humanize-duration');

    const auth = useAuth();
    const userInfo = useUserInfo();

    useEffect(() => {
        modal ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'auto');
    }, [modal]);

    useEffect(() => {
        getCategories();
    }, [auth.currentUser]);

    const getCategories = async () => {
        setIsLoading(true);
        if (!auth.currentUser) {
            return;
        }
        const res = await businessService.getCategoriesList(page, auth.currentUser.id);
        setPage(res.pagination.next);
        setCount(res.pagination.count);
        userInfo.setCategories([...userInfo.categories, ...res.data]);
        setIsLoading(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <Navbar title="Dịch vụ" />
            </div>
            <div className={cx('content')}>
                <Header setModal={setModal} />
                <div className={cx('service-list')}>
                    {userInfo.categories.map((item) => {
                        return (
                            <div key={item.id} className={cx('service-container')}>
                                <div className={cx('header')}>
                                    <div className={cx('service-type')}>
                                        <h5>{item.name}</h5>
                                    </div>
                                    <div className={cx('actions')}>
                                        <FontAwesomeIcon icon={faEllipsis} />
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
                    {userInfo.categories.length > 0 && userInfo.categories.length < count && (
                        <div className={cx('footer')}>
                            <Button className={cx('more-btn')} primary disabled={isLoading} onClick={getCategories}>
                                {isLoading ? <Spinner /> : 'Xem thêm'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <Modal modal={modal} setModal={setModal} />
        </div>
    );
}

export default Services;
