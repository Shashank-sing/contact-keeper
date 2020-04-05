import React, { useContext, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ({ title, icon }) => {

    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const { clearContact } = useContext(ContactContext);

    const onLogout = () => {
        logout();
        clearContact();
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="">
                    Logout
                </a>
            </li>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    )


    return (
        <div className="navbar bg-primary">

            <h1>
                <i className={icon}></i>
                {' '}{title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLink}

            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: "Contact-Keeper",
    icon: "fas fa-id-card-alt"
}

export default Navbar