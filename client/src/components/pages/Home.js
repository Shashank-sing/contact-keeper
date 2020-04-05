import React, {useEffect, useContext} from 'react'
import Contacts from '../contacts/Contacts.js'
import ContactForm from '../contacts/ContactForm'
import AuthContext from '../../context/auth/authContext'
const Home = () => {

    const {loadUser} = useContext(AuthContext);

    useEffect(()=>{
        loadUser();
// eslint-disable-next-line
    }, [])

    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <Contacts />
            </div>
        </div>
    )
}

export default Home;