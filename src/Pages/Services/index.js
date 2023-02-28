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
const cx = classNames.bind(styles);

function Services() {
    const [modal, setModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        modal ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'auto');
    }, [modal]);

    useEffect(() => {
        getCategories();
    }, [auth.currentUser]);

    const getCategories = async () => {
        if (!auth.currentUser) {
            return;
        }
        const res = await businessService.getCategoriesList(auth.currentUser.id);
        console.log(res.data);
        setCategories(res.data);
    };

    return (
        <div className={cx('wrapper')}>
            <Navbar title="Dịch vụ" />
            <div className={cx('content')}>
                <Header setModal={setModal} />
                <div className={cx('service-list')}>
                    {categories?.map((item) => {
                        return (
                            <div className={cx('service-item')}>
                                <div className={cx('header')}>
                                    <div className={cx('service-type')}>
                                        <h5> {item.name} </h5>
                                    </div>
                                    <div className={cx('actions')}>
                                        <FontAwesomeIcon icon={faEllipsis} />
                                    </div>
                                </div>
                                <div className={cx('service-body')}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Modal modal={modal} setModal={setModal} />
        </div>
    );
}

export default Services;
