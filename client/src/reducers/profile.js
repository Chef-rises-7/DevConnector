import { PROFILE_ERROR, GET_PROFILE } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    repos: [],
    error: {}  
};


const profile = (state=initialState,action) => {
    const {type, payload} = action;

    switch(type) {

        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };

        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state;
    }
};

export default profile;