import { csrfFetch } from "./csrf";

const CREATE_SPOT = 'spots/createSpot';
const REMOVE_SPOT = 'spots/removeSpot';
const UPDATE_SPOT = 'spots/updateSpot';

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot
    };
};

const removeSpot = () => {
    return {
        type: REMOVE_SPOT
    };
};

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        payload: spot
    };
};

export const create = (spot) => async (dispatch) => {
    const {address, city, state, country, lat, lng, name, description, price} = spot;
    const response = await csrfFetch("/api/spots/create", {
        method: "POST",
        body: JSON.stringify({
            address, 
            city, 
            state, 
            country, 
            lat, 
            lng, 
            name, 
            description, 
            price
        })
    });
    const data = await response.json();
    dispatch(createSpot(data.spot));
    return response;
};

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    });
    dispatch(removeSpot());
    return response;
  };

  export const update = (spotId, spot) => async (dispatch) => {
    const {address, city, state, country, lat, lng, name, description, price} = spot;
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        body: JSON.stringify({
            address, 
            city, 
            state, 
            country, 
            lat, 
            lng, 
            name, 
            description, 
            price
        })
    });
    const data = await response.json();
    dispatch(updateSpot(data.spot));
    return response;
};

const initialState = { spot: null };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SPOT:
            return { ...state, spot: action.payload };
        case REMOVE_SPOT:
            return { ...state, spot: null };
        case UPDATE_SPOT:
            return { ...state, spot: action.payload}
        default:
            return state;
    }
};

export default spotsReducer;