import React, { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import {
    SUCCESS_REGISTER,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_USER
} from '../types'

const AuthState = (props) => {
    const initialState = {
        loading: true,
        isAuthenticated: null,
        user: null,
        token: localStorage.getItem('token'),
        error: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const loadUser = async () => {
        if(localStorage.token)
            setAuthToken(localStorage.token)

        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({type: AUTH_ERROR})
        }
    }

    const loginUser = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }

        }

        try {
            const res = await axios.post('./api/auth', formData, config);
            dispatch({type: LOGIN_USER, payload: res.data});
            loadUser();

        } catch (err) {
            dispatch({type: AUTH_ERROR, payload: err.response.data.msg})
        }


    }

    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }

        }


        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({ type: SUCCESS_REGISTER, payload: res.data });

            loadUser()

        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS})
    }

    const logout = () => dispatch({type:AUTH_ERROR})

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                user: state.user,
                register,
                clearErrors,
                loadUser,
                loginUser,
                logout
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState

