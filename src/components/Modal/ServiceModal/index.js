import classNames from 'classnames/bind';
import GeneralInfo from './GeneralInfo';
import OnlineBooking from './OnlineBooking';
import styles from './ServiceModal.module.scss';
import Staff from './Staff';

const cx = classNames.bind(styles);

function ServiceModal() {
    return (
        <div className={cx('wrapper')}>
            <GeneralInfo />
            <OnlineBooking />
            <Staff />
        </div>
    );
}

export default ServiceModal;
