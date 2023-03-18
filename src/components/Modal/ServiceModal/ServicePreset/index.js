import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useServiceInfo } from '../../../../Contexts/ServiceInfoContext';
import Button from '../../../Button';
import PresetBody from './PresetBody';
import styles from './ServicePreset.module.scss';
const cx = classNames.bind(styles);

function ServicePreset() {
    const serviceInfo = useServiceInfo();

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>Mức Tiền Và Thời Lượng Dịch Vụ</h1>
                </div>
                <hr className={cx('splitter')} />
                {serviceInfo.error && <p className={cx('error')}> *ít nhất phải có 1 tên thể loại </p>}
                {serviceInfo.serviceFields.service_pricing_rules.map((preset, i) => {
                    return <PresetBody count={i} data={preset} key={i} />;
                })}
                <div className={cx('footer')}>
                    <Button
                        className={cx('add-more-btn')}
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={() => {
                            serviceInfo.handleAddPricingRules();
                        }}
                    >
                        Thêm lựa chọn giá
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ServicePreset;
