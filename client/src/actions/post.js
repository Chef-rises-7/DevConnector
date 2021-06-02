import axios from "axios"
import { POST_ERROR, GET_POST, GET_POSTS, UPDATE_LIKES, DELETE_POSTS, ADD_POST, REMOVE_COMMENT, ADD_COMMENT} from "../actions/types"
import { setAlert } from "./alert";

export const getPosts = () => async(dispatch) => {
    try {
        const res = await axios.get("/api/posts");

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

export const addLike = (postId) => async(dispatch) => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

export const addUnlike = (postId) => async(dispatch) => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

export const deletePost = (postId) => async(dispatch) => {
    try {
        const res = await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POSTS,
            payload: postId
        });

        dispatch(setAlert("Post Deleted Successfully","success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

export const addPost = (formData) => async(dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await axios.post('/api/posts',formData,config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert("Post Added Successfully","success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")));
        }

        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

export const getPost = (postId) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/posts/${postId}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

export const addComment = (postId,formData) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await axios.post(`/api/posts/comment/${postId}`,formData,config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert("Comment Added Successfully","success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")));
        }

        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


export const removeComment = (postId,commentId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert("Comment Removed Successfully","success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};
