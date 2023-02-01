import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ children, className, type, value, leftIcon, rightIcon }) {
    let Comp = 'button';
    const classes = cx('wrapper', {
        [className]: className,
    });
    return (
        <Comp className={classes}>
            <span className={cx('left-icon')}>{leftIcon}</span>
            {children}
            <span className={cx('right-icon')}>{rightIcon}</span>
        </Comp>
    );
}

export default Button;
