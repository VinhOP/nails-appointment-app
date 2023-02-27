import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from '../../components/Modal';
import Header from './Header';
import styles from './Services.module.scss';
const cx = classNames.bind(styles);

function Services() {
    const [modal, setModal] = useState(false);
    useEffect(() => {
        modal ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'auto');
    }, [modal]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Header setModal={setModal} />
                <div></div>
                <Modal modal={modal} setModal={setModal} />
            </div>
        </div>
    );
}

export default Services;
