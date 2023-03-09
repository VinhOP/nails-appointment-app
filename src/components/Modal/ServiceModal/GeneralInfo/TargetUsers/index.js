import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { useServiceInfo } from '../../../../../Contexts/ServiceInfoContext';
import InputForm from '../../../../InputForm';
import Popper from '../../../../Popper/DropdownPopper';
import styles from './TargetUsers.module.scss';
const cx = classNames.bind(styles);

function TargetUsers() {
    const serviceInfo = useServiceInfo();
    const [isOpen, setIsOpen] = useState();
    const [selectedTarget, setSelectedTarget] = useState({
        name: '',
        type: 'every_one',
    });

    const handleSelect = (e) => {
        setSelectedTarget({ ...selectedTarget, name: e.target.innerText });
        setIsOpen(false);
    };

    useEffect(() => {
        serviceInfo.handleSetServiceFields('service_available_for', selectedTarget.type);
    }, [selectedTarget]);

    return (
        <>
            <InputForm value={selectedTarget.name || 'Mọi người'} isButton readOnly onClick={() => setIsOpen(!isOpen)}>
                Đối tượng sử dụng
            </InputForm>
            {isOpen && (
                <Popper className={cx('target-popper')}>
                    <div className={cx('target-list')}>
                        <div className={cx('target-user')} onClick={handleSelect}>
                            Mọi người
                        </div>
                    </div>
                </Popper>
            )}
        </>
    );
}

export default TargetUsers;
