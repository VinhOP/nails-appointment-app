import { faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Fragment, useEffect } from 'react';
import { useModal } from '../../../Contexts/ModalContext';
import Button from '../../Button';
import Modal from '../../Modal';
import styles from './MenuItem.module.scss';
const cx = classNames.bind(styles);

function MenuItem({ menuList, setMenuList, isCollapse, active = false }) {
    const modal = useModal();
    const handleClick = (item, i) => {
        modal.setProfileModal(false);
        if (item.logOut) {
            item.logOut();
            return;
        }

        if (item.profile) {
            item.profile();
            return;
        }

        if (!item.children) {
            const newMenu = menuList.map((item, index) => {
                return { ...item, isOpen: i === index };
            });
            modal.setServiceModal(false);
            setMenuList(newMenu);
            return;
        }

        const newMenu = [
            ...menuList.slice(0, i),
            {
                ...menuList[i],
                rightIcon: item.children && (
                    <FontAwesomeIcon className={cx('right-icon')} icon={item.isOpen ? faChevronLeft : faChevronDown} />
                ),
                isOpen: !item.isOpen,
            },
            ...menuList.slice(i + 1),
        ];
        setMenuList(newMenu);
    };

    return (
        <div className={cx('wrapper', { active: active })}>
            {menuList?.map((item, i) => {
                return (
                    <Fragment key={i}>
                        <div className={cx('menu-item', { active: item.isOpen })} onClick={() => handleClick(item, i)}>
                            <Button
                                to={item.url}
                                className={cx('item-btn')}
                                leftIcon={item.leftIcon}
                                rightIcon={!isCollapse && item.rightIcon}
                            >
                                {!isCollapse && <span className={cx('title')}>{item.name}</span>}
                            </Button>
                        </div>
                        {item.children && (
                            <MenuItem menuList={item.children} isCollapse={isCollapse} active={item.isOpen} />
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
}

export default MenuItem;
