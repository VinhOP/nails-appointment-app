import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const ServiceInfoContext = createContext();

export const useServiceInfo = () => useContext(ServiceInfoContext);

function ServiceInfoProvider({ children }) {
    const [serviceFields, setServiceFields] = useState({
        name: '',
        category_id: '',
        description: '',
        service_available_for: '',
        enabled_online_booking: '',
        service_pricing_rules: [
            {
                duration: '',
                price: '',
                price_type: '',
                special_price: '',
            },
        ],
        staffs: [],
    });

    console.log(serviceFields);

    const handleSetServiceFields = (key, value) => {
        setServiceFields({ ...serviceFields, [key]: value });
    };

    const value = {
        serviceFields,
        setServiceFields,
        handleSetServiceFields,
    };
    return <ServiceInfoContext.Provider value={value}>{children}</ServiceInfoContext.Provider>;
}

export default ServiceInfoProvider;
