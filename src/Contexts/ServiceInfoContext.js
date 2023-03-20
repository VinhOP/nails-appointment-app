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
        id: '',
        name: '',
        category_id: '',
        category_name: '',
        description: '',
        service_available_for: '',
        enabled_online_booking: false,
        service_pricing_rules: [
            {
                name: '',
                duration: 1800000,
                price: 0,
                price_type: 'fixed',
                special_price: 0,
            },
        ],
        staffs: [],
    });

    const [categoriesList, setCategoriesList] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState(false);

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

    const editCategory = async (id, name, description, index) => {
        try {
            const res = await businessService.editCategory(id, name, description, token);
            setCategoriesList([
                ...categoriesList.slice(0, index),
                { ...categoriesList[index], name: res.object.name, description: res.object.description },
                ...categoriesList.slice(index + 1),
            ]);
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

    const handleSetStaffs = (key, value, index) => {
        setServiceFields({
            ...serviceFields,
            staffs: [
                // ...serviceFields.staffs.slice(0, index),
                // { ...serviceFields.staffs[index], [key]: value },
                // ...serviceFields.staffs.slice(index + 1),
                ...serviceFields.staffs,
                { [key]: value },
            ],
        });
    };

    const handleAddPricingRules = () => {
        setServiceFields({
            ...serviceFields,
            service_pricing_rules: [
                ...serviceFields.service_pricing_rules,
                {
                    name: '',
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
                description: serviceFields.description,
                service_available_for: serviceFields.service_available_for,
                enabled_online_booking: serviceFields.enabled_online_booking,
                service_pricing_rules_attributes: serviceFields.service_pricing_rules.map((rules) => {
                    return { ...rules, duration: rules.duration / 60000 };
                }),
                services_staffs_attributes: serviceFields.staffs,
            });
            const res = await getCategories();
            setCategoriesList(res.data);
            notifySuccess(response.message);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditService = async () => {
        try {
            const response = await businessService.editService({
                token: token,
                name: serviceFields.name,
                category_id: serviceFields.category_id,
                description: serviceFields.description,
                service_available_for: serviceFields.service_available_for,
                enabled_online_booking: serviceFields.enabled_online_booking,
                service_pricing_rules_attributes: serviceFields.service_pricing_rules.map((rules) => {
                    return { ...rules, duration: rules.duration / 60000 };
                }),
                services_staffs_attributes: serviceFields.staffs,
                id: serviceFields.id,
            });
            const res = await getCategories();
            setCategoriesList(res.data);
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
        handleSetStaffs,
        handleSaveService,
        handleEditService,
        getCategories,
        setCategoriesList,
        addCategory,
        deleteCategory,
        editCategory,
        categoriesList,
        isLoading,
        setIsLoading,
        error,
        setError,
    };
    return <ServiceInfoContext.Provider value={value}>{children}</ServiceInfoContext.Provider>;
}

export default ServiceInfoProvider;
