import client from "./client";

const endpoint = "/customers";

const registerCustomer = (addresses, firstName, lastName, phone, email, deliveryAddress, billingAddress) =>
    client.post(endpoint, {
        addresses,
        firstName,
        lastName,
        phone,
        email, deliveryAddress,
        billingAddress,
    })

export default {
    registerCustomer
}