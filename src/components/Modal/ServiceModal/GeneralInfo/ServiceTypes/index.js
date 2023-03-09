import InputForm from '../../../../InputForm';
import Popper from '../../../../Popper/DropdownPopper';
import classNames from 'classnames/bind';
import styles from './ServiceTypes.module.scss';
import { useUserInfo } from '../../../../../Contexts/UserInfoContext';
import { useState } from 'react';
import { useServiceInfo } from '../../../../../Contexts/ServiceInfoContext';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function ServiceTypes() {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState();
    const [selectedServiceName, setSelectedServiceName] = useState('');

    const userInfo = useUserInfo();
    const serviceInfo = useServiceInfo();

    const handleSelectService = (type) => {
        setSelectedServiceId(type.id);
        setSelectedServiceName(type.name);
        setOpenDropdown(false);
    };

    useEffect(() => {
        serviceInfo.handleSetServiceFields('category_id', selectedServiceId);
    }, [selectedServiceId]);

    return (
        <>
            <InputForm
                onClick={() => {
                    setOpenDropdown(!openDropdown);
                }}
                readOnly
                placeholder="Lựa chọn..."
                isButton
                value={selectedServiceName}
            >
                Loại dịch vụ
            </InputForm>
            {openDropdown && (
                <Popper className={cx('service-types-popper')}>
                    <div className={cx('service-types-content')}>
                        {userInfo.categories?.map((type) => {
                            return (
                                <div
                                    onClick={() => handleSelectService(type)}
                                    className={cx('service-item')}
                                    key={type.id}
                                >
                                    {type.name}
                                </div>
                            );
                        })}
                    </div>
                </Popper>
            )}
        </>
    );
}

export default ServiceTypes;
