import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/transactions';

const client = axios.create({
    baseURL: BASE_URL,
});

const get = async () => {
    try {
        const resp = await client.get('/');
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

const getById = async (transactionId) => {
    try {
        const resp = await client.get(`/${transactionId}`);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

const create = async (transaction) => {
    try {
        const resp = await client.post(`/`, transaction);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

const remove = async (transactionId) => {
    try {
        const resp = await client.delete(`/${transactionId}`);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

const update = async (transaction, id) => {
    try {
        const resp = await client.put(`/${id}`, transaction);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const transactionService = {
    get,
    getById,
    create,
    remove,
    update,
};
