import React, { useContext, Fragment, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import ContactFilter from './ContactFilter'
import Spinner from '../layout/Spinner'

const Contacts = () => {
    const { contacts, filtered, getContact, loading } = useContext(ContactContext);

    useEffect(()=>{
        getContact();
        // eslint-disable-next-line
    }, [])

    if(contacts!==null &&contacts.length === 0 && !loading) {
        return <h4>No Contacts</h4>
    }

    return (
        contacts!==null && !loading? <Fragment>
        <ContactFilter />
        {filtered !== null? filtered.map(contact => (
            <h3 key={contact._id}>
                <ContactItem  contact={contact} />
            </h3>
        )):contacts.map(contact =>
            <h3 key={contact._id}>
                <ContactItem  contact={contact} />
            </h3>
        )}
    </Fragment> : <Spinner/>
        
    )
}

export default Contacts
