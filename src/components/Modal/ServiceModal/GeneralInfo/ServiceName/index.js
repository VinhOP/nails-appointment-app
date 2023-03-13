import { useState } from 'react';
import { useServiceInfo } from '../../../../../Contexts/ServiceInfoContext';
import InputForm from '../../../../InputForm';

function ServiceName() {
    const serviceInfo = useServiceInfo();
    const [error, setError] = useState('');

    const handleSetName = (e) => {
        e.target.value.length > 0 ? setError('') : setError('Vui lòng nhập tên');
        serviceInfo.handleSetServiceFields('name', e.target.value);
    };

    const handleOnBlur = () => {
        serviceInfo.serviceFields?.name.length < 1 ? setError('Vui lòng nhập tên') : setError('');
    };

    return (
        <>
            <InputForm
                value={serviceInfo.serviceFields.name}
                onChange={handleSetName}
                type="text"
                errorText={error}
                onBlur={handleOnBlur}
            >
                Tên dịch vụ
            </InputForm>
        </>
    );
}

export default ServiceName;
