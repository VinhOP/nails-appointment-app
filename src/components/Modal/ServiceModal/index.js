import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '../../Button';
import InputForm from '../../InputForm';
import styles from './ServiceModal.module.scss';

const cx = classNames.bind(styles);

function ServiceModal() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('general-info')}>
                <h1 className={cx('title')}>Thông tin cơ bản</h1>
                <InputForm className={cx('info-item')} type="text">
                    Tên dịch vụ
                </InputForm>
                <InputForm
                    className={cx('info-item')}
                    icon={<FontAwesomeIcon icon={faCaretDown} />}
                    readOnly
                    placeHolder="Lựa chọn..."
                    isButton
                >
                    Loại dịch vụ
                </InputForm>
                <InputForm className={cx('info-item')} textArea type="text-area">
                    Mô tả dịch vụ
                </InputForm>
                <InputForm isButton className={cx('info-item')} readOnly placeHolder="mọi người">
                    Đối tượng sử dụng
                </InputForm>
            </div>
        </div>
    );
}

export default ServiceModal;
