import Screen from "./Screen";
import {FlatList, StyleSheet} from "react-native";
import OrderItem from "../components/OrderItem";
import ordersApi from "../api/orders"
import {useState} from "react";

const orders = [
    {
        id: 1,
        name: "order1",
        price: 231,
        status: "Placed"
    },
    {
        id: 2,
        name: "order2",
        price: 231,
        status: "Placed"
    },
    {
        id: 3,
        name: "order3",
        price: 231,
        status: "Placed"
    },
    {
        id: 4,
        name: "order4",
        price: 231,
        status: "Placed"
    },
]

export default () => {
    const [orders, setOrders] = useState([]);


    const getOrders = () => {
        ordersApi.getOrders()
    }


    return (
        <Screen>
            <FlatList
                data={orders}
                renderItem={({item}) => {
                    return (
                        <OrderItem
                            name={item.name}
                            price={item.price}
                            status={item.status}
                            style={styles.orderItem}
                        />
                    )
                }}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    orderItem: {
        paddingHorizontal: 32,
        paddingVertical: 16
    }
})