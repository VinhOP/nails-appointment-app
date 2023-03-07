import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import InputForm from '../../../../InputForm';
import styles from './PresetBody.module.scss';
const cx = classNames.bind(styles);

function PresetBody({ count }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>{`Lựa chọn mức tiền ${count}`}</h2>
                    {count > 1 && (
                        <span>
                            <FontAwesomeIcon icon={faClose} className={cx('close-btn')} />
                        </span>
                    )}
                </div>
                <div className={cx('preset-container')}>
                    <InputForm className={cx('preset-item')} whiteBg>
                        Thời gian làm
                    </InputForm>
                    <InputForm className={cx('preset-item')} whiteBg>
                        Thể loại giá
                    </InputForm>
                    <InputForm className={cx('preset-item')}>Thành tiền</InputForm>
                    <InputForm className={cx('preset-item')}>Giá đặc biệt</InputForm>
                    <InputForm className={cx('preset-item', 'preset-type')}>Tên thể loại</InputForm>
                </div>
            </div>
        </div>
    );
}

export default PresetBody;
