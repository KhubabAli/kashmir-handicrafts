import client from './client';

const endpoint = "/auth"

const login = (phone, password) => client.post(endpoint, {phone, password});

export default {
    login,
}