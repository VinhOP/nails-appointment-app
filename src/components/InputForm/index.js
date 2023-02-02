import classNames from 'classnames/bind';
import { useRef } from 'react';
import styles from './InputForm.module.scss';

const cx = classNames.bind(styles);

function InputForm({ children, id, type, name, value, onBlur, onChange }) {
    const inputContainerRef = useRef();

    const props = {
        type,
        id,
        name,
        value,
        onBlur,
        onChange,
    };

    return (
        <div className={cx('wrapper')}>
            <label className={cx('title')}>{children} </label>
            <div ref={inputContainerRef} className={cx('input-container')}>
                <input {...props} />
            </div>
        </div>
    );
}

export default InputForm;
