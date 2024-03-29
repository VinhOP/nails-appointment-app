import classNames from 'classnames/bind';
import Popper from '../../Popper/DropdownPopper';
import GeneralInfo from './GeneralInfo';
import OnlineBooking from './OnlineBooking';
import styles from './ServiceModal.module.scss';
import ServicePreset from './ServicePreset';
import Staff from './Staff';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function ServiceModal() {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <GeneralInfo />
            <OnlineBooking />
            <Staff />
            <Popper className={cx('service-presets')}>
                <ServicePreset />
            </Popper>
        </div>
    );
}

export default ServiceModal;
