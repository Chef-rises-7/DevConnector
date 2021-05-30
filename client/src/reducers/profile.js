import { PROFILE_ERROR, GET_REPOS, GET_PROFILES, GET_PROFILE, CLEAR_PROFILE, UPDATE_PROFILE } from "../actions/types";

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
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };

        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
                repos: []
            };

        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }

        default:
            return state;
    }
};

export default profile;