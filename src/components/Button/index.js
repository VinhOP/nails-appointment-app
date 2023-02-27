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
    onClick,
}) {
    let Comp = 'button';

    const props = {
        onClick,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    }
    const classes = cx('wrapper', {
        primary,
        disabled,
        [className]: className,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
