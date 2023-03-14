import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../../../components/Button';
import InputForm from '../../../components/InputForm';
import { useServiceInfo } from '../../../Contexts/ServiceInfoContext';
import styles from './AddServiceTypeModal.module.scss';
const cx = classNames.bind(styles);

function AddServiceTypeModal({ serviceTypeModal, setServiceTypeModal }) {
    const [serviceName, setServiceName] = useState();
    const [serviceDesciption, setServiceDescription] = useState();

    const serviceInfo = useServiceInfo();

    const handleClose = () => {
        setServiceTypeModal(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        await serviceInfo.addCategory(serviceName, serviceDesciption);
        setServiceTypeModal(false);
    };

    useEffect(() => {
        document.body.style.overflowY = 'hidden';

        return () => (document.body.style.overflowY = 'auto');
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}> Thêm mới loại dịch vụ </h1>
                    <span className={cx('close-btn')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                </div>
                <hr />
                <div className={cx('body')}>
                    <div className={cx('input-container')}>
                        <InputForm className={cx('input-item')} onChange={(e) => setServiceName(e.target.value)}>
                            TÊN LOẠI DỊCH VỤ
                        </InputForm>
                        <InputForm
                            className={cx('input-item')}
                            textArea
                            onChange={(e) => setServiceDescription(e.target.value)}
                        >
                            MÔ TẢ LOẠI DỊCH VỤ
                        </InputForm>
                    </div>
                </div>
                <hr />
                <div className={cx('footer')}>
                    <Button className={cx('save-btn')} primary borderBold type="submit" onClick={handleSave}>
                        Lưu
                    </Button>
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default AddServiceTypeModal;
