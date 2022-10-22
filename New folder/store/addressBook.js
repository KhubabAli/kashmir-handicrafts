import {createSelector, createSlice,} from "@reduxjs/toolkit";

let lastId = 0;
const slice = createSlice({
    name: "addressBook",
    initialState: {
        addresses: [],
        totalAddresses: 0,
        selectedAddress: {},
        selectedPaymentMethod: {},
        saveCard: {},
        selectedBillingAddress: null,
        favourites: [],
    },
    reducers: {
        addressAdded: (addressBook, action) => {
            addressBook.totalAddresses += 1;
            addressBook.addresses.push({...action.payload, id: addressBook.totalAddresses});
        },
        addressSelected: (addressBook, action) => {
            addressBook.selectedAddress = action.payload.address;
        },
        paymentMethodSelected: (addressBook, action) => {
            addressBook.selectedPaymentMethod = action.payload.paymentMethod;
        },
        billingAddressSelected: (addressBook, action) => {
            addressBook.selectedBillingAddress = action.payload.billingAddress;
        },
        cardSaved: (addressBook, action) => {
            addressBook.savedCard = action.payload.card
        },
        favouriteAdded: (addressBook, action) => {
            addressBook.favourites.push(action.payload.itemId)
        },
        favouriteRemoved: (addressBook, action) => {
            addressBook.favourites = addressBook.favourites.filter(id => id !== action.payload.itemId);
        }
    }
})

const {
    addressAdded,
    addressSelected,
    paymentMethodSelected,
    billingAddressSelected,
    cardSaved,
    favouriteAdded,
    favouriteRemoved
} = slice.actions

export const addAddress = address => ({
    type: addressAdded.type,
    payload: {
        ...address
    }
})

export const saveSelectedAddress = address => ({
    type: addressSelected.type,
    payload: {
        address
    }
})

export const saveSelectedPaymentMethod = paymentMethod => ({
    type: paymentMethodSelected.type,
    payload: {
        paymentMethod
    }
})

export const saveBillingAddress = billingAddress => ({
    type: billingAddressSelected.type,
    payload: {
        billingAddress
    }
})

export const addFavourite = itemId => ({
    type: favouriteAdded.type,
    payload: {
        itemId
    }
})

export const removeFavourite = itemId => ({
    type: favouriteRemoved.type,
    payload: {
        itemId
    }
})


export const saveCard = card => ({
    type: cardSaved.type,
    payload: {
        card
    }
})

export const getSavedCard = createSelector(
    state => state.entities.addressBook.savedCard,
    savedCard => savedCard
)

export const getAddresses = createSelector(
    state => state.entities.addressBook,
    addressBook => addressBook.addresses
)

export const getSelectedAddress = createSelector(
    state => state.entities.addressBook.selectedAddress,
    selectedAddress => selectedAddress
)

export const getSelectedPaymentMethod = createSelector(
    state => state.entities.addressBook.selectedPaymentMethod,
    selectedPaymentMethod => selectedPaymentMethod
)

export const getSelectedBillingAddress = createSelector(
    state => state.entities.addressBook.selectedBillingAddress,
    selectedBillingAddress => selectedBillingAddress
)

export const isInFavourites = itemId => createSelector(
    state => state.entities.addressBook,
    addressBook => addressBook.favourites.some(id => id === itemId)
)

export default slice.reducer;