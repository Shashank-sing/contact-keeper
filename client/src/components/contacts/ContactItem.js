import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import ContactContext from "../../context/contact/contactContext"

const ContactItem = ({ contact}) => {
    const { name, email, phone, type } = contact;
    
    const {deleteContact, setCurrent, clearCurrent} = useContext(ContactContext);

    const onDelete = e => {
        deleteContact(contact);
        clearCurrent();
    }

    return (
        <div className="card bg-light trxt-left">
            <h3 className="text-primary text-left">
                {name}{' '}
                <span style={{float: 'right'}}className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    {(type.charAt(0).toUpperCase()
                        + type.slice(1))}
                </span>
            </h3>
            <ul className="list text-left">
                {email && (<li>
                    <i className="fas fa-envelope-open"></i>
                    {' '}{email}
                </li>)}
                {phone && (<li>
                    <i className="fas fa-phone"></i>
                    {' '}{phone}
                </li>)}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm float-left" onClick={() => setCurrent(contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div >
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem