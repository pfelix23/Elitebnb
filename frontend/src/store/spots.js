import { csrfFetch } from "./csrf";

const CREATE_SPOT = 'spots/createSpot';
const REMOVE_SPOT = 'spots/removeSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const CREATE_REVIEW = 'spots/createReview';
const GET_CURRENT_SPOTS ='spots/current';
const GET_SPOT = 'spots/getSpot';
const GET_SPOTS ='spots/getSpots';
const GET_REVIEWS = 'spots/reviews';

const reviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        payload: reviews

    }
}

const theSpots = (spots) => {
   return { 
    type: GET_SPOTS,
    payload: spots
}
};

const getSpot = (spot) => {
    return {
    type: GET_SPOT,
    payload: spot}
  };

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

const createReview = (reviews) => {
    return {
        type: CREATE_REVIEW,
        payload: reviews
    };
};

const getCurrentSpots = (spots) => {
    return {
        type: GET_CURRENT_SPOTS,
        payload: spots
    }
}

export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET'
    });
    const data = await response.json()
    dispatch(reviews(data.Reviews));
    return response;
}

export const allSpots = () => async (dispatch) => {
    const response = await fetch("/api/spots", {
        method: 'GET'
    });
    const data = await response.json()
    dispatch(theSpots(data.Spots));
    return response;
}

export const create = (spot) => async (dispatch) => {
    const {address, city, state, country, lat, lng, name, description, price, previewImage, image, image1, image2, image3} = spot;
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
            price,
            previewImage, 
            image,
            image1,
            image2,
            image3

        })
    });
    const data = await response.json();
    dispatch(createSpot(data.spot));
    return (data);
};

export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    });
    dispatch(removeSpot());
    return response;
  };

  export const update = (spotId, spot) => async (dispatch) => {
    const {address, city, state, country, lat, lng, name, description, price, previewImage, image, image1, image2, image3} = spot;
    const response = await csrfFetch(`/api/spots/${spotId}/update`, {
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
            price,
            previewImage, 
            image, 
            image1, 
            image2, 
            image3
        })
    });
    const data = await response.json();
    dispatch(updateSpot(data.spot));
    return response;
};

export const post = (spotId, reviews) => async (dispatch) => {
    const {review, stars} = reviews;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars 
        })
    });

    const data = await response.json();
    dispatch(createReview(data.reviews));
    return response;
};

export const getSpots = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${userId}/current`, {
      method: 'GET'
    });
    const data = await response.json()
    dispatch(getCurrentSpots(data.Spots));
    return response;
  };

  export const getSpotDetails = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'GET',
  });
  const data = await response.json()
  dispatch(getSpot(data.spot));
  return response;
};
   

const initialState = { spot: null, spots: [], reviews: [] };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SPOT:
            return { ...state, spot: action.payload };
        case REMOVE_SPOT:
            return { ...state, spot: null };
        case UPDATE_SPOT:
            return { ...state, spot: action.payload};
        case CREATE_REVIEW:
            return { ...state, reviews: action.payload };
        case GET_CURRENT_SPOTS:
            return { ...state, spots: action.payload};
        case GET_SPOT:
            return {...state, spot: action.payload};
        case GET_SPOTS:
            return { ...state, spots: action.payload};
        case GET_REVIEWS:
            return { ...state, reviews: action.payload}
        default:
            return state;
    }
};

export default spotsReducer;