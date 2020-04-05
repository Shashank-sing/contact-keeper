import React, {useContext, useRef} from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    var { filterContact, clearFilter} = contactContext;

    const text = useRef('')

    const onChange = e => {
        if(text.current.value!=='') {
            filterContact(e.target.value);
        } else {
            clearFilter();
        }
    }

    return(
        <form>
            <input ref={text} type="text" placeholder="Filter" onChange={onChange}/>
        </form>
    )
}

export default ContactFilter