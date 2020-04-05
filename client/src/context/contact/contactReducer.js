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

const contactReducer = (state, action) => {
    switch(action.type) {
        case GET_CONTACT:
            return ({
                ...state, 
                contacts: action.payload,
                loading:false
            })
        case ADD_CONTACT:
            return ({
                ...state,
                contacts: [...state.contacts, action.payload],
                loading:false

            })
        case CLEAR_CONTACT:
                return ({
                    ...state,
                    contacts: null,

                })
        case CONTACT_ERROR: 
            return ({
                ...state, 
                error: action.payload
            })
        case DELETE_CONTACT:
            return ({
                ...state,
                loading:false,
                contacts: state.contacts.filter(contact => {
                    return contact._id !== action.payload
                     
                })

            })
        case UPDATE_CONTACT:
            return ({
                ...state,
                contacts: state.contacts.map(contact => {
                    return (contact.id === action.payload.id)?action.payload: contact;
                }),
                loading:false

            })
        case SET_CURRENT: 
            return ({
                ...state,
                current: action.payload
            })

        case CLEAR_CURRENT:
            return ({
                ...state,
                current:null
            })
        case FILTER_CONTACT:
            const regex = new RegExp(action.payload, 'gi'); 
            return ({
                ...state,
                filtered: state.contacts.filter(contact => {
                    return contact.name.match(regex) || contact.email.match(regex)
                })
            })
        case CLEAR_FILTER:
            return ({
                ...state,
                filtered: null
            })
        default: 
            return ({...state})
    }
}

export default contactReducer