const updating = ({getState}) => next => action => {
    if (!getState().entities.cart.updating) next(action);
}

export default updating;