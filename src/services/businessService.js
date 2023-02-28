import * as httpsRequest from '../utilities/httpsRequest';

export const types = async () => {
    try {
        const businessType = await httpsRequest.get('business_types');
        return businessType;
    } catch (err) {
        console.log(err);
    }
};

export const getCategoriesList = async (id) => {
    try {
        const categories = await httpsRequest.get(`categories?partner_id=${id}`);
        return categories;
    } catch (err) {
        console.log(err);
    }
};
