import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import * as businessService from '../services/businessService';
import { useAuth } from './AuthContext';
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
                name: '',
                duration: 1800000,
                price: '0',
                price_type: 'fixed',
                special_price: '0',
            },
        ],
        staffs: [],
    });
    const [categoriesList, setCategoriesList] = useState([]);
    const [isLoading, setIsLoading] = useState();
    console.log(categoriesList);

    const auth = useAuth();

    const notifySuccess = (message) => toast.success(message);
    const token = sessionStorage.getItem('userToken');

    const getCategories = async (page) => {
        try {
            setIsLoading(true);
            if (!auth.currentUser) {
                return;
            }
            const res = await businessService.getCategoriesList(page, auth.currentUser.id);

            setIsLoading(false);
            return res;
        } catch (err) {
            console.log(err);
        }
    };

    const deleteCategory = async (id, index) => {
        try {
            const res = await businessService.deleteCategory(id, token);
            setCategoriesList(categoriesList.filter((category, i) => i !== index));
            notifySuccess(res.message);
        } catch (err) {
            console.log(err);
        }
    };

    const addCategory = async (name, description) => {
        try {
            const res = await businessService.addCategory(name, description, token);
            setCategoriesList([res.object, ...categoriesList]);
            notifySuccess(res.message);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSetServiceFields = (key, value) => {
        setServiceFields({ ...serviceFields, [key]: value });
    };

    const handleSetPricingRules = (key, value, index) => {
        setServiceFields({
            ...serviceFields,
            service_pricing_rules: [
                ...serviceFields.service_pricing_rules.slice(0, index),
                { ...serviceFields.service_pricing_rules[index], [key]: value },
                ...serviceFields.service_pricing_rules.slice(index + 1),
            ],
        });
    };

    const handleAddPricingRules = () => {
        setServiceFields({
            ...serviceFields,
            service_pricing_rules: [
                ...serviceFields.service_pricing_rules,
                {
                    duration: 1800000,
                    price: '0',
                    price_type: 'fixed',
                    special_price: '0',
                },
            ],
        });
    };

    const handleDeletePricingRules = (index) => {
        const newArr = serviceFields.service_pricing_rules.filter((preset, i) => i !== index);
        setServiceFields({ ...serviceFields, service_pricing_rules: newArr });
    };

    const handleSaveService = async () => {
        try {
            const response = await businessService.saveService({
                token: token,
                name: serviceFields.name,
                category_id: serviceFields.category_id,
                service_pricing_rules_attributes: serviceFields.service_pricing_rules.map((rules) => {
                    return { ...rules, duration: rules.duration / 60000 };
                }),
                partner_id: serviceFields.staffs.map((staff) => staff.id),
            });
            console.log(response);
            notifySuccess(response.message);
        } catch (err) {
            console.log(err);
        }
    };

    const value = {
        serviceFields,
        setServiceFields,
        handleSetServiceFields,
        handleSetPricingRules,
        handleAddPricingRules,
        handleDeletePricingRules,
        handleSaveService,
        getCategories,
        setCategoriesList,
        deleteCategory,
        addCategory,
        categoriesList,
        isLoading,
        setIsLoading,
    };
    return <ServiceInfoContext.Provider value={value}>{children}</ServiceInfoContext.Provider>;
}

export default ServiceInfoProvider;
