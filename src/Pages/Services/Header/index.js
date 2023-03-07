import Button from '../../../components/Button';
import Popper from '../../../components/Popper/DropdownPopper';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Header({ setModal }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(false);
        setModal(true);
    };
    return (
        <div className={cx('header')}>
            <div className={cx('btn-container')}>
                <Button
                    primary
                    className={cx('add-new-btn')}
                    onClick={() => setIsOpen(!isOpen)}
                    onBlur={() => setIsOpen(false)}
                >
                    Thêm mới
                </Button>
                <Popper className={cx('dropdown-menu', { active: isOpen })}>
                    <Button className={cx('dropdown-item')} onClick={handleClick}>
                        Thêm mới dịch vụ
                    </Button>
                    <Button className={cx('dropdown-item')}>Thêm mới loại dịch vụ</Button>
                </Popper>
            </div>
        </div>
    );
}

export default Header;
