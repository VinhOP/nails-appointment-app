import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import Button from '../Button';
import styles from './InputForm.module.scss';

const cx = classNames.bind(styles);

function InputForm({
    children,
    id,
    type,
    name,
    value,
    error,
    onBlur,
    onChange,
    fixedValue,
    textArea = false,
    readOnly = false,
    isButton = false,
    className,
    ...arg
}) {
    const inputContainerRef = useRef();
    const props = {
        type,
        id,
        name,
        value,
        error,
        onBlur,
        onChange,
        textArea,
        readOnly,
        isButton,
        ...arg,
    };

    let Comp = 'input';

    if (textArea) {
        Comp = 'textarea';
    }

    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <label htmlFor={name} className={cx('title')}>
                {children}
            </label>
            {fixedValue ? (
                <p className={cx('readonly-value')}>{value}</p>
            ) : (
                <div
                    ref={inputContainerRef}
                    className={cx(
                        'input-container',
                        { error: error },
                        { 'text-area': textArea },
                        { 'button-style': isButton },
                    )}
                >
                    <Comp {...props} />
                    {isButton && (
                        <span className={cx('right-icon')}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

export default InputForm;
