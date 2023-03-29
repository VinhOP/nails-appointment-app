import * as httpsRequest from '../utilities/httpsRequest';

export const getStaffs = async (token) => {
    try {
        const res = await httpsRequest.get('staffs', {
            headers: {
                Authorization: token,
            },
        });
        return res;
    } catch (err) {
        console.log(err);
    }
};
