import {createSlice, createSelector} from "@reduxjs/toolkit";
import immer from "immer";

let magma = 0;

const slice = createSlice({
    name: "cart",
    initialState: {
        items: {},
        loading: false,
        size: 0,
        updating: false,
    },
    reducers: {
        itemAdded: (cart, action) => {
            cart.size += 1;
            const alreadyExist = Object.values(cart.items).some((item) => {
                if (item._id === action.payload._id) {
                    item.count += 1;
                    return true;
                }
            })

            if (!alreadyExist)
                cart.items = {
                    ...cart.items,
                    [cart.size]: {
                        ...action.payload,
                        itemNumber: cart.size
                    }
                }
        },
        itemRemoved: (cart, action) => {
            delete cart.items[action.payload.itemNumber];
        },

        itemCountIncremented: (cart, action) => {
            cart.items[action.payload.itemNumber].count += 1;
            console.log("heloo", ++magma);
        },

        itemCountDecremented: (cart, action) => {
            cart.updating = true;
            cart.items[action.payload.itemNumber].count -= 1;
            cart.updating = false;
        },

        cartEmptied: (cart, action) => {
            cart.items = {};
            cart.size = 0;
        },

    }
});

const {
    itemAdded,
    itemCountDecremented,
    itemCountIncremented,
    itemRemoved,
    cartEmptied,
    cartBeingUpdated
} = slice.actions;

export const addItem = item => ({
    type: itemAdded.type,
    payload: {
        ...item
    }
});

export const removeItem = itemNumber => ({
    type: itemRemoved.type,
    payload: {
        itemNumber
    }
});

export const incrementItemCount = itemNumber => ({
    type: itemCountIncremented.type,
    payload: {
        itemNumber
    }
});

export const decrementItemCount = itemNumber => ({
    type: itemCountDecremented.type,
    payload: {
        itemNumber
    }
});

export const emptyCart = () => ({
        type: cartEmptied.type,
    }
)

export const setCartBeingUpdated = () => ({
    type: cartBeingUpdated.type,
})


export const getCartItems = createSelector(
    state => state.entities.cart,
    cart => cart.items
)

export const getCartItemsCount = createSelector(
    state => state.entities.cart,
    cart => {
        let totalItems = 0;
        Object.values(cart.items).forEach(item => totalItems += item.count)
        return totalItems;
    }
)

export const getTotalPrice = createSelector(
    state => state.entities.cart.items,
    items => {
        let totalPrice = 0;
        Object.values(items).forEach(item => totalPrice += item.price * item.count);
        return totalPrice;
    }
)

export const getItemsWithIds = createSelector(
    state => state.entities.cart.items,
    items => {
        return Object.values(items).map(item => ({
            _id: item._id,
            count: item.count,
        }));
    }
)

export default slice.reducer;



