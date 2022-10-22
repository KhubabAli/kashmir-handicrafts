import client from './client';

const endpoint = '/items';

const getItems = (page, filter) => client.get(endpoint, {page, ...filter},);

const getItem = (itemId) => {
    console.log(`${endpoint}/${itemId}`)
    return client.get(`${endpoint}/${itemId}`)
};


const addItem = (item, onUploadProgress) => {
    const data = new FormData();
    data.append('name', item.name);
    data.append('price', item.price);
    data.append("categoryId", item.category.categoryId);
    data.append("categoryIdInDb", item.category._id);
    data.append("description", item.description);
    data.append("color", item.color);
    data.append("size", item.size);
    data.append("numberInStock", item.numberInStock);

    item.images.forEach((image, index) =>
        data.append('images', {
            name: 'image' + index,
            type: 'image/jpeg',
            uri: image
        }));

    return client.post(endpoint, data, {
        onUploadProgress: (progress => onUploadProgress(progress.loaded / progress.total)),
    });
}

export default {
    addItem,
    getItem,
    getItems,
}