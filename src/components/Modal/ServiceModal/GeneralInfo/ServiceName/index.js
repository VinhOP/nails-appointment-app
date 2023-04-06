import { useEffect } from 'react';
import { useState } from 'react';
import { useServiceInfo } from '../../../../../Contexts/ServiceInfoContext';
import InputForm from '../../../../InputForm';

const ERROR_VALUE = '*Vui lòng nhập tên';

function ServiceName() {
    const serviceInfo = useServiceInfo();
    const [error, setError] = useState();

    const handleSetName = (e) => {
        e.target.value.length > 0 && setError(false);
        serviceInfo.handleSetServiceFields('name', e.target.value);
    };

    const handleError = () => {
        !serviceInfo.serviceFields.name.trim() && setError(true);
    };

    useEffect(() => {
        setError(serviceInfo.errorName);
    }, [serviceInfo.errorName]);
    return (
        <>
            <InputForm
                value={serviceInfo.serviceFields.name}
                onChange={handleSetName}
                type="text"
                errorText={ERROR_VALUE}
                errorStatus={error}
                onBlur={handleError}
            >
                Tên dịch vụ
            </InputForm>
        </>
    );
}

export default ServiceName;
