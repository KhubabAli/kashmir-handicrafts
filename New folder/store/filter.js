import {createSelector, createSlice} from "@reduxjs/toolkit";

const categories = [
    {
        name: "Poncho",
        selected: false,
        id: 1,
    },
    {
        name: "Pheran",
        selected: false,
        id: 2,
    },
    {
        name: "Shawl",
        selected: false,
        id: 3,
    },
    {
        name: "Kurta",
        selected: false,
        id: 4,
    },
    {
        name: "Gown",
        selected: false,
        id: 5,
    },
    {
        name: "Suit",
        selected: false,
        id: 6,
    },

]
const colors = [
    {
        name: "red",
        selected: false,
        id: 1,
    },
    {
        name: "gray",
        selected: false,
        id: 2,
    },
    {
        name: "pink",
        selected: false,
        id: 3,
    },
    {
        name: "blue",
        selected: false,
        id: 4,
    },
    {
        name: "orange",
        selected: false,
        id: 5,
    },

]
const sizes = [
    {
        name: "32 inches",
        selected: false,
        id: 1,
    },
    {
        name: "42 inches",
        selected: false,
        id: 2,
    },
    {
        name: "25 inches",
        selected: false,
        id: 3,
    },
    {
        name: "52 inches",
        selected: false,
        id: 4,
    },
    {
        name: "72 inches",
        selected: false,
        id: 5,
    },
]


const slice = createSlice({
    name: "filter",
    initialState: {
        priceRange: {min: 0, max: 10000},
        categories,
        colors,
        sizes,
        filterApplied: false,
    },
    reducers: {
        categorySelectedSwitched: ({categories}, {payload: {id}}) => {
            const index = categories.findIndex(cat => cat.id === id)
            categories[index].selected = !categories[index].selected;
        },
        colorSelectedSwitched: ({colors}, {payload: {id}}) => {
            const index = colors.findIndex(cat => cat.id === id)
            colors[index].selected = !colors[index].selected;
        },
        sizeSelectedSwitched: ({sizes}, {payload: {id}}) => {
            const index = sizes.findIndex(cat => cat.id === id)
            sizes[index].selected = !sizes[index].selected;
        },
        priceSet: ({priceRange}, {payload: {min, max}}) => {
            priceRange.min = min;
            priceRange.max = max;
        },
        filterCleared: (filter, action) => {
            filter.priceRange.min = 0;
            filter.priceRange.max = 10000;
            filter.categories = categories;
            filter.colors = colors;
            filter.sizes = sizes;
        },
        filterApplied: (filter, action) => {
            filter.filterApplied = action.payload.applied;
        }
    }
})


const {
    categorySelectedSwitched,
    colorSelectedSwitched,
    sizeSelectedSwitched,
    priceSet,
    filterCleared,
    filterApplied
} = slice.actions;

export const setFilterApplied = (applied) => ({
    type: filterApplied.type,
    payload: {
        applied
    }
});

export const switchCategorySelected = (id) => ({
    type: categorySelectedSwitched.type,
    payload: {
        id,
    }
});


export const switchColorSelected = (id) => ({
    type: colorSelectedSwitched.type,
    payload: {
        id,
    }
});


export const switchSizeSelected = (id) => ({
    type: sizeSelectedSwitched.type,
    payload: {
        id,
    }
});


export const setPrice = (min, max) => ({
    type: priceSet.type,
    payload: {
        min,
        max
    }
});


export const clearFilter = ({
    type: filterCleared.type,
    payload: {}
})

export const getFilter = createSelector(
    state => state.entities.filter,
    filter => filter
)

export const getFilterApplied = createSelector(
    state => state.entities.filter.filterApplied,
    filterApplied => filterApplied
)

export const getAppliedFilter = createSelector(
    state => state.entities.filter,
    filter => {
        if (!filter.filterApplied) return null;
        return {
            priceRange: filter.priceRange,
            categories: filter.categories.filter(cat => cat.selected),
            colors: filter.colors.filter(col => col.selected),
            sizes: filter.sizes.filter(siz => siz.selected),
        }
    }
)


export default slice.reducer;