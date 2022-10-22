import {createSlice, createSelector} from "@reduxjs/toolkit"

const slice = createSlice({
    name: "user",
    initialState: {
        id: "",
        name: "",
        phone: "",
    },
    reducers: {
        userSet: (user, action) => {
            user.id = action.payload.id
            user.name = action.payload.name
        },
        userRemoved: (user, action) => {
            user.id = ""
            user.name = ""
        }
    }
})

const {
    userRemoved,
    userSet
} = slice.actions;


export const setUser = (id, name) => ({
    type: userSet.type,
    payload: {
        id,
        name
    }
})

export const removeUser = () => ({
    type: userRemoved.type
})

// Selectors
export const getUser = createSelector(
    state => state.entities.user,
    user => user
)

export default slice.reducer;