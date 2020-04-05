import {
    SUCCESS_REGISTER,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_USER
} from '../types'

const authReducer = (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return ({
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
            })
        case SUCCESS_REGISTER:
        case LOGIN_USER:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                loading: false
            } 
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            delete localStorage.token;
            return {
                ...state,
                error: action.payload,
                isAuthenticated:false,
                user: null,
                token: null,
                loading: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default: 
            return state
    }
}

export default authReducer