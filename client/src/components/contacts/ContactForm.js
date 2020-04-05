import React, { useContext, useState, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const { addContact, updateContact, current, clearCurrent } = contactContext;

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const { name, email, phone, type } = contact;

    useEffect(() => {
        if (current != null)
            setContact(current)
    }, [contactContext, current]);

    const onChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (!current) {
            addContact(contact);
        } else {
            updateContact(contact)
        }
        clearCurrent();
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    const onClear = e => {
        e.preventDefault();
        clearCurrent();
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
                {current ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <input type="text" placeholder="name" name="name" value={name} onChange={onChange} />
            <input type="text" placeholder="email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="phone" name="phone" value={phone} onChange={onChange} />

            <h3 className="text-left">Contact Type</h3>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal {' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> Professional
            <div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={onClear}>Clear</button>
            </div>}

        </form>
    )

}

export default ContactForm
