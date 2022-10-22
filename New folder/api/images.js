import client from './client';

const endpoint = '/images';

const getImages = (imagesId) => client.get(`${endpoint}/${imagesId}`);

export default {
    getImages,
}