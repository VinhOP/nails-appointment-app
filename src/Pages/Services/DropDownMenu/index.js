import classNames from 'classnames/bind';
import styles from './DropDownMenu.module.scss';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Button from '../../../components/Button';
import Popper from '../../../components/Popper/DropdownPopper';
import { useServiceInfo } from '../../../Contexts/ServiceInfoContext';
import ServiceTypeModal from '../ServiceTypeModal';

const cx = classNames.bind(styles);

function DropDownMenu({ category, index }) {
    const serviceInfo = useServiceInfo();
    const [openPopper, setOpenPopper] = useState(false);
    const [editServiceTypeModal, setEditServiceTypeModal] = useState(false);

    const handleOpenServiceTypeModal = () => {
        setEditServiceTypeModal(true);
        setOpenPopper(false);
    };

    const handleDelete = () => {
        serviceInfo.deleteCategory(category.id, index);
        setOpenPopper(false);
    };

    return (
        <div className={cx('wrapper')}>
            <FontAwesomeIcon
                className={cx('action-btn')}
                icon={faEllipsis}
                onClick={() => setOpenPopper(!openPopper)}
            />
            <Popper className={cx('dropdown-menu', { active: openPopper })}>
                <Button className={cx('dropdown-item')} onClick={handleOpenServiceTypeModal}>   
                    Chỉnh sửa loại dịch vụ
                </Button>
                <Button className={cx('dropdown-item')} onClick={handleDelete}>
                    Xoá loại dịch vụ
                </Button>
            </Popper>
            {editServiceTypeModal && (
                <ServiceTypeModal
                    type="edit"
                    title={'Chỉnh sửa loại dịch vụ'}
                    category={category}
                    index={index}
                    description={category.description}
                    serviceTypeModal={editServiceTypeModal}
                    setServiceTypeModal={setEditServiceTypeModal}
                />
            )}
        </div>
    );
}

export default DropDownMenu;
