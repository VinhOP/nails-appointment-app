import classNames from 'classnames/bind';
import { useEffect } from 'react';
import InputForm from '../../../components/InputForm';
import styles from './AddServiceTypeModal.module.scss';
const cx = classNames.bind(styles);

function AddServiceTypeModal() {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <InputForm>TÊN LOẠI DỊCH VỤ</InputForm>
                <InputForm>MÔ TẢ LOẠI DỊCH VỤ</InputForm>
            </div>
            <div></div>
        </div>
    );
}

export default AddServiceTypeModal;
