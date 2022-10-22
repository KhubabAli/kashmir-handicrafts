import clinet from "./client";

const endpoint = "/orders";

const placeOrder = (customerId, items) => clinet.post(endpoint, {
    customerId,
    items,
});

const getOrders = (customerId) => clinet.get(`${endpoint}/${customerId}`)

export default {
    placeOrder,
    getOrders
}