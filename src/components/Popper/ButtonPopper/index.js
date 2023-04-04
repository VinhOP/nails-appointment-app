import classNames from 'classnames/bind';
import styles from './ButtonPopper.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function ButtonPopper({ children, className, isOpen, setIsOpen }) {
    const classes = cx('wrapper', {
        active: isOpen,
        [className]: className,
    });
    return (
        <div className={classes}>
            <div className={cx('content')}>{children}</div>
            <div className={cx({ 'blur-outside': isOpen })} onClick={() => setIsOpen(false)}></div>
        </div>
    );
}

export default ButtonPopper;
