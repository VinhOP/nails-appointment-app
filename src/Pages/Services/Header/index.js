import Button from '../../../components/Button';
import Popper from '../../../components/Popper/DropdownPopper';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useState } from 'react';
import ServiceTypeModal from '../ServiceTypeModal';
import { useModal } from '../../../Contexts/ModalContext';
import ButtonPopper from '../../../components/Popper/ButtonPopper';

const cx = classNames.bind(styles);

function Header({ setIsEditModal }) {
    const [isOpen, setIsOpen] = useState(false);
    const [addServiceTypeModal, setAddServiceTypeModal] = useState(false);
    const modal = useModal();

    const handleClick = () => {
        setIsOpen(false);
        modal.setModal(true);
        modal.setServiceModal(true);
        setIsEditModal(false);
    };

    const handleOpenServiceType = () => {
        setIsOpen(false);
        setAddServiceTypeModal(true);
    };

    return (
        <div className={cx('header')}>
            <div className={cx('btn-container')}>
                <Button primary className={cx('add-new-btn')} onClick={() => setIsOpen(!isOpen)}>
                    Thêm mới
                </Button>
                <ButtonPopper isOpen={isOpen} setIsOpen={setIsOpen} className={cx('dropdown-menu')}>
                    <Button className={cx('dropdown-item')} onClick={handleClick}>
                        Thêm mới dịch vụ
                    </Button>
                    <Button className={cx('dropdown-item')} onClick={handleOpenServiceType}>
                        Thêm mới loại dịch vụ
                    </Button>
                </ButtonPopper>
            </div>
            {addServiceTypeModal && (
                <ServiceTypeModal
                    type={'add'}
                    title={'Thêm mới loại dịch vụ'}
                    serviceTypeModal={addServiceTypeModal}
                    setServiceTypeModal={setAddServiceTypeModal}
                />
            )}
        </div>
    );
}

export default Header;
