import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/products';

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

const getById = async (productId) => {
    try {
        const resp = await client.get(`/${productId}`);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

const create = async (product) => {
    try {
        const resp = await client.post(`/`, product);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

const remove = async (productId) => {
    try {
        const resp = await client.delete(`/${productId}`);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

const update = async (product, id) => {
    try {
        const resp = await client.put(`/${id}`, product);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const productService = {
    get,
    getById,
    create,
    remove,
    update,
};
