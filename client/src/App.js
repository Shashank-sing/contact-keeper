import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alerts from './components/layout/Alerts'
import AlertState from './context/alert/AlertState'
import PrivateRoute from './components/routing/PrivateRoutes'
import setAuthToken from './utils/setAuthToken'
if(localStorage.token) {
    setAuthToken(localStorage.token);
}


const App = () => {
    return (
        <ContactState>
            <AuthState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <div className="container">
                                <Alerts />
                                <Switch>
                                    <PrivateRoute exact path="/" component={Home}></PrivateRoute>
                                    <Route exact path="/about" component={About}></Route>
                                    <Route exact path="/register" component={Register}></Route>
                                    <Route exact path="/login" component={Login}></Route>
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertState>
            </AuthState>
        </ContactState>
    );
}

export default App;
