import * as httpsRequest from '../utilities/httpsRequest';

export const types = async () => {
    try {
        const businessType = await httpsRequest.get('business_types');
        return businessType;
    } catch (err) {
        console.log(err);
    }
};

export const getCategoriesList = async (page = 1, id, getAll = false) => {
    try {
        const categories = await httpsRequest.get(`categories?page=${page}&partner_id=${id}&get_all=${getAll}`);
        return categories;
    } catch (err) {
        console.log(err);
    }
};

export const addCategory = async (name, description, token) => {
    try {
        const res = await httpsRequest.post(
            `categories`,
            {
                name,
                description,
            },
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const deleteCategory = async (id, token) => {
    try {
        const res = await httpsRequest.del(`categories/${id}`, {
            headers: {
                Authorization: token,
            },
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const editCategory = async (id, name, description, token) => {
    try {
        const res = await httpsRequest.put(
            `categories/${id}`,
            {
                name,
                description,
            },
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const saveService = async ({ token, name, category_id, service_pricing_rules_attributes, partner_id }) => {
    try {
        const response = await httpsRequest.post(
            `services`,
            {
                name,
                category_id,
                service_pricing_rules_attributes,
                services_staffs_attributes: partner_id,
            },
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return response;
    } catch (err) {
        console.log(err);
    }
};
