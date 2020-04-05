import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'


const Login = props => {

    const {loginUser, error, clearErrors, isAuthenticated} = useContext(AuthContext);
    const { setAlert } = useContext(AlertContext)


    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/');
        }
        if(error === 'Invalid Credentials') {
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
        if (email === '' || password === '') {
            setAlert('Please Enter All the fields', 'danger');
        } else {
            loginUser({email, password})
        }
    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>
                <input type="submit" className="btn btn-primary btn-block" value="Login" />
            </form>
        </div>
    )
}

export default Login