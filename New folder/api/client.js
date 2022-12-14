import {create} from 'apisauce';
import {user} from '../auth/useAuth'

import cache from "../utility/cache";

const apiClient = create({
    baseURL: 'http://192.168.18.103:3003/api'
});
 
const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig);
    if (response.ok) {
        await cache.store(url, response.data);
        return response;
    }

    const data = await cache.get(url);
    return data ? {ok: true, data} : response;
}

export default apiClient;

