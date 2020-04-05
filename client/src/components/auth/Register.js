import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = props => {

    const { setAlert } = useContext(AlertContext)

    const {register, error, clearErrors, isAuthenticated} = useContext(AuthContext);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = user

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }
        if(error === 'Use new email ID') {
            setAlert(error, 'danger')
            // eslint-disable-next-line
        }
        clearErrors();
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '' || password2 === '') {
            setAlert('Please Enter All the fields', 'danger');
        } else if(password !== password2) {
            setAlert('The passwords do not match', 'danger');
        } else {
            register({
                name,
                email, 
                password
            });
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} onChange={onChange} />
                </div>
                <input type="submit" className="btn btn-primary btn-block" value="Register" />
            </form>
        </div>
    )
}

export default Register