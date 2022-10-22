import localStorage from "../utility/localStorage"

const endpoint = '/carts';
const key = "/cart";

// const getCart = (id) => client.get(`${endpoint}/${id}`);

const getCartItems = async () => {
    let cart = await localStorage.get(key);
    if (!cart) await createCart();
    cart = await localStorage.get(key);
    return cart.items;
}

const createCart = async () => {
    await localStorage.store(key, {items: []})
}

const removeItem = async (_id) => {
    const cart = await localStorage.get(key);
    const newItems = cart.items.filter((item) => item._id !== _id)
    cart.items = newItems;
    localStorage.store(key, cart);
}


let updateRunning = false;
const updateItem = async (items) => {
    if (!updateRunning) {
        updateRunning = true;
        await localStorage.store(key, {items: items});
        updateRunning = false;
    }
}
// const updateItem = async (_id, count) => {
//     const cart = await localStorage.get(key);
//     let index = cart.items.findIndex(obj => obj._id === _id)
//     if (index || index === 0) {
//         cart.items[index].count = count;
//     }
//     await localStorage.store(key, cart);
// }

const addItem = async (item, onUploadProgress) => {
    const cart = await localStorage.get(key);
    if (!cart?.items) {
        await createCart();
        await localStorage.store(key, {items: [item]})
        return;
    }

    const index = cart.items.findIndex((obj) => obj._id === item._id)
    if (index >= 0) {
        cart.items[index].count += 1;
    } else {
        cart.items.push(item);
    }
    await localStorage.store(key, cart);

}

export default {
    addItem,
    getCartItems,
    createCart,
    removeItem,
    updateItem,
}