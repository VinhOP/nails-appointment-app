import classNames from 'classnames/bind';
import styles from './InputForm.module.scss';

const cx = classNames.bind(styles);

function InputForm({ children, id, type }) {
    return (
        <div className={cx('wrapper')}>
            <label className={cx('title')}>{children}</label>
            <div className={cx('input')}>
                <input type={type} id={id} />
            </div>
        </div>
    );
}

export default InputForm;
