import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '../../../Button';
import PresetBody from './PresetBody';
import styles from './ServicePreset.module.scss';
const cx = classNames.bind(styles);

function ServicePreset() {
    const [pricingRules, setPricingRules] = useState([
        {
            work_time: '',
            price_type: '',
            name: '',
            price: '0',
            special_price: '0',
        },
    ]);
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Mức Tiền Và Thời Lượng Dịch Vụ</h1>
            </div>
            <hr className={cx('splitter')} />
            {pricingRules.map((preset, i) => {
                return (
                    <PresetBody count={i} data={preset} pricingRules={pricingRules} setPricingRules={setPricingRules} />
                );
            })}
            <div className={cx('footer')}>
                <Button
                    className={cx('add-more-btn')}
                    leftIcon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() =>
                        setPricingRules([
                            ...pricingRules,
                            { work_time: '', price_type: '', name: '', price: '0', special_price: '0' },
                        ])
                    }
                >
                    Thêm lựa chọn giá
                </Button>
            </div>
        </div>
    );
}

export default ServicePreset;
