import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '../../../Button';
import PresetBody from './PresetBody';
import styles from './ServicePreset.module.scss';
const cx = classNames.bind(styles);

function ServicePreset() {
    const [presetsBody, setPresetsBody] = useState([1]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Mức Tiền Và Thời Lượng Dịch Vụ</h1>
            </div>
            <hr className={cx('splitter')} />
            {presetsBody.map((preset) => {
                return <PresetBody count={preset} />;
            })}
            <div className={cx('footer')}>
                <Button
                    className={cx('add-more-btn')}
                    leftIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() => setPresetsBody([...presetsBody, presetsBody.length + 1])}
                >
                    Thêm lựa chọn giá
                </Button>
            </div>
        </div>
    );
}

export default ServicePreset;
