import {createSlice, createSelector} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "checkoutNav",
    initialState: {
        currentStep: 1
    },
    reducers: {
        currentStepSet: (checkoutNav, action) => {
            checkoutNav.currentStep = action.payload;
        }
    }
})

const {
    currentStepSet
} = slice.actions;

export const setCurrentStep = currentStep => ({
    type: currentStepSet.type,
    payload: currentStep
})

export const getCurrentStep = createSelector(
    state => state.navigation.checkoutNav.currentStep,
    currentStep => currentStep
)

export default slice.reducer;