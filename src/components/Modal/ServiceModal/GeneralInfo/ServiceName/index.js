import { useServiceInfo } from '../../../../../Contexts/ServiceInfoContext';
import InputForm from '../../../../InputForm';

function ServiceName() {
    const serviceInfo = useServiceInfo();

    const handleSetName = (e) => {
        serviceInfo.handleSetServiceFields('name', e.target.value);
    };

    return (
        <>
            <InputForm value={serviceInfo.serviceFields.name} onChange={handleSetName} type="text">
                Tên dịch vụ
            </InputForm>
        </>
    );
}

export default ServiceName;
