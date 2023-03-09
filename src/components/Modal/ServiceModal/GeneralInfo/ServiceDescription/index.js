import { useServiceInfo } from '../../../../../Contexts/ServiceInfoContext';
import InputForm from '../../../../InputForm';

function ServiceDescription() {
    const serviceInfo = useServiceInfo();

    const handleSetDescription = (e) => {
        serviceInfo.handleSetServiceFields('description', e.target.value);
    };

    return (
        <>
            <InputForm
                onChange={handleSetDescription}
                value={serviceInfo.serviceFields.description}
                textArea
                type="text-area"
            >
                Mô tả dịch vụ
            </InputForm>
        </>
    );
}

export default ServiceDescription;
