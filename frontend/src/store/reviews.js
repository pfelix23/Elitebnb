import { csrfFetch } from "./csrf";

const CREATE_REVIEW = 'spots/createReview';
const REMOVE_REVIEW = 'reviews/removeReview';
const UPDATE_REVIEW = 'reviews/updateReview';

const createReview = (reviews) => {
    return {
        type: CREATE_REVIEW,
        payload: reviews
    };
};

const removeReview = () => {
    return {
        type: REMOVE_REVIEW
    };
};

const updateReview = (reviews) => {
    return {
        type: UPDATE_REVIEW,
        payload: reviews
    };
};

export const post = (reviews, spotId) => async (dispatch) => {
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

export const delete_review = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    });
    dispatch(removeReview());
    return response;
  };

  export const update = (reviewId, reviews) => async (dispatch) => {
    const {review, stars} = reviews;
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify({
            review,
            stars
        })
    });
    const data = await response.json();
    dispatch(updateReview(data.reviews));
    return response;
};

const initialState = { reviews: null };

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REVIEW:
            return { ...state, reviews: action.payload };
        case REMOVE_REVIEW:
            return { ...state, reviews: null };
        case UPDATE_REVIEW:
            return { ...state, reviews: action.payload}
        default:
            return state;
    }
};

export default reviewsReducer;