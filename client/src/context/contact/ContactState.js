import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import axios from 'axios'
import React, { useReducer } from 'react'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACT,
    CLEAR_CONTACT
} from '../types'

const ContactState = (props) => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        loading: true
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const getContact = async () => {
        try {
            const res = await axios.get('/api/contacts');

            dispatch({ type: GET_CONTACT, payload: res.data });
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }

    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data });

        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }

    }

    const deleteContact = async (contact) => {
        try {

            const res = await axios.delete(`/api/contacts/${contact._id}`);
            dispatch({ type:DELETE_CONTACT, payload: res.data._id});

        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }

    const updateContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({ type:UPDATE_CONTACT, payload: contact});

        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
    }

    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    const filterContact = (text) => {
        dispatch({ type: FILTER_CONTACT, payload: text });
    }

    const clearFilter = () => dispatch({ type: CLEAR_FILTER });

    const clearContact = () => dispatch({type: CLEAR_CONTACT});


    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                addContact,
                deleteContact,
                updateContact,
                setCurrent,
                clearCurrent,
                filterContact,
                clearFilter,
                getContact,
                clearContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState