import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    children,
    className,
    type,
    value,
    leftIcon = false,
    rightIcon = false,
    submit = false,
    onClick = false,
}) {
    let Comp = 'button';
    const props = {
        onClick,
    };
    const classes = cx('wrapper', {
        submit,
        [className]: className,
    });
    return (
        <Comp className={classes} {...props}>
            <span className={cx('left-icon')}>{leftIcon}</span>
            {children}
            <span className={cx('right-icon')}>{rightIcon}</span>
        </Comp>
    );
}

export default Button;
