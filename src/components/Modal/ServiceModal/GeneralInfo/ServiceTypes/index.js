import InputForm from '../../../../InputForm';
import Popper from '../../../../Popper/DropdownPopper';
import classNames from 'classnames/bind';
import styles from './ServiceTypes.module.scss';
import { useUserInfo } from '../../../../../Contexts/UserInfoContext';
import { useState } from 'react';
import { useServiceInfo } from '../../../../../Contexts/ServiceInfoContext';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
const cx = classNames.bind(styles);

const ERROR_VALUE = '*Vui lòng nhập loại dịch vụ';

function ServiceTypes() {
    const serviceInfo = useServiceInfo();

    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedServiceName, setSelectedServiceName] = useState('');
    const [error, setError] = useState(false);

    const handleSelectService = (type) => {
        serviceInfo.handleSetServiceFields('category_id', type.id);
        // setSelectedServiceName(type.name);
        // setSelectedServiceId(type.id);
        setError(false);
        setOpenDropdown(false);
    };

    const handleOnBlur = () => {
        serviceInfo.serviceFields?.category_id.length < 1 ? setError(true) : setError(false);
    };

    useLayoutEffect(() => {
        const category = serviceInfo.categoriesList.find(
            (category) => category.id === serviceInfo.serviceFields.category_id,
        );
        setSelectedServiceName(category?.name);
    }, [serviceInfo.serviceFields.category_id]);

    useEffect(() => {
        setError(serviceInfo.error);
    }, [serviceInfo.error]);

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
                errorText={ERROR_VALUE}
                errorStatus={error}
                onBlur={handleOnBlur}
            >
                Loại dịch vụ
            </InputForm>
            {openDropdown && (
                <Popper className={cx('service-types-popper')}>
                    <div className={cx('service-types-content')}>
                        {serviceInfo.categoriesList?.map((type) => {
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
