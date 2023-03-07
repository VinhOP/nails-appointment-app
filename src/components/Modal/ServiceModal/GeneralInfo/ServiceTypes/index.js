import InputForm from '../../../../InputForm';
import Popper from '../../../../Popper/DropdownPopper';
import classNames from 'classnames/bind';
import styles from './ServiceTypes.module.scss';
import { useUserInfo } from '../../../../../Contexts/UserInfoContext';
import { useState } from 'react';
const cx = classNames.bind(styles);

function ServiceTypes() {
    const userInfo = useUserInfo();
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedService, setSelectedService] = useState();

    const handleSelectService = (e) => {
        setOpenDropdown(false);
        setSelectedService(e.target.innerText);
    };

    return (
        <div className={cx('wrapper')}>
            <InputForm
                onClick={() => {
                    setOpenDropdown(!openDropdown);
                }}
                onBlur={() => {
                    setOpenDropdown(false);
                }}
                readOnly
                placeholder="Lựa chọn..."
                isButton
                value={selectedService}
            >
                Loại dịch vụ
            </InputForm>
            {openDropdown && (
                <Popper className={cx('service-types-popper')}>
                    <div className={cx('service-types-content')}>
                        {userInfo.categories?.map((type) => {
                            return (
                                <div onClick={handleSelectService} className={cx('service-item')} key={type.id}>
                                    {type.name}
                                </div>
                            );
                        })}
                    </div>
                </Popper>
            )}
        </div>
    );
}

export default ServiceTypes;
