import { faFaceFrown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Services.module.scss';
const cx = classNames.bind(styles);

function Services() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('container')}>
                    <div className={cx('sad-icon')}>
                        <FontAwesomeIcon icon={faFaceFrown} />
                    </div>
                    <h1 className={cx('title')}> Úi da, không có gì ở đây.</h1>
                    <p>
                        Xin lỗi vì sự bất tiện này. Tính năng này đang được phát triển và sẽ sớm triển khai trong thời
                        gian tới.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Services;
