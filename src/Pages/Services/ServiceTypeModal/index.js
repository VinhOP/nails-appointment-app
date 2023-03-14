import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../../../components/Button';
import InputForm from '../../../components/InputForm';
import { useServiceInfo } from '../../../Contexts/ServiceInfoContext';
import styles from './ServiceTypeModal.module.scss';
const cx = classNames.bind(styles);

function ServiceTypeModal({ title, category = false, index, setServiceTypeModal, type }) {
    const [serviceName, setServiceName] = useState(category.name || '');
    const [serviceDesciption, setServiceDescription] = useState(category.description || '');

    const serviceInfo = useServiceInfo();

    const handleClose = () => {
        setServiceTypeModal(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        switch (type) {
            case 'add':
                await serviceInfo.addCategory(serviceName, serviceDesciption);
                break;
            case 'edit':
                await serviceInfo.editCategory(category.id, serviceName, serviceDesciption, index);
                break;
            default:
                break;
        }
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
                    <h1 className={cx('title')}> {title} </h1>
                    <span className={cx('close-btn')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faClose} />
                    </span>
                </div>
                <hr />
                <div className={cx('body')}>
                    <div className={cx('input-container')}>
                        <InputForm
                            value={serviceName}
                            className={cx('input-item')}
                            onChange={(e) => setServiceName(e.target.value)}
                        >
                            TÊN LOẠI DỊCH VỤ
                        </InputForm>
                        <InputForm
                            value={serviceDesciption}
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
        </div>
    );
}

export default ServiceTypeModal;
