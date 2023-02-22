import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);
function Menu() {
    return (
        <div className={cx('wrapper')}>
            <MenuItem />
        </div>
    );
}

export default Menu;
