import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
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
    errorStatus,
    errorText,
    onBlur,
    onChange,
    placeholder,
    fixedValue,
    textArea = false,
    readOnly = false,
    isButton = false,
    whiteBg = false,
    fade = false,
    className,
    ...arg
}) {
    const inputContainerRef = useRef();
    const [errorNotice, setErrorNotice] = useState(false);

    useEffect(() => {
        setErrorNotice(errorStatus);
    }, [errorStatus]);

    const props = {
        type,
        id,
        name,
        value,
        error,
        onBlur,
        onChange,
        placeholder,
        readOnly,
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
                        { 'white-bg': whiteBg },
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
            {errorNotice && <div className={cx('error')}>{errorText}</div>}
        </div>
    );
}

export default InputForm;
