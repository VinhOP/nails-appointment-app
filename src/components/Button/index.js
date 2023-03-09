import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    children,
    className,
    type,
    value,
    to = false,
    leftIcon = false,
    rightIcon = false,
    primary = false,
    disabled = false,
    borderBold = false,
    pointer = false,
    onClick,
    onBlur,
    onMouseDown,
}) {
    let Comp = 'button';

    const props = {
        onClick,
        onBlur,
        onMouseDown,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    }
    const classes = cx('wrapper', {
        primary,
        disabled,
        'border-bold': borderBold,
        [className]: className,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('left-icon', { pointer: pointer })}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={cx('right-icon', { pointer: pointer })}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
