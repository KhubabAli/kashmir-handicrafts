import client from "./client";

const endpoint = "/create_payment_intent"

const getClientSecret = (orderId) => client.post(endpoint, {orderId});

export default {
    getClientSecret
}
