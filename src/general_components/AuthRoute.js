import React, { useContext } from 'react';
import { AuthContext } from "../firebase/AuthContext";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
    const {user} = useContext(AuthContext); 
    return (
        !!user ? <Route path={props.path} component={props.component}></Route> : <Route path={props.path}><Redirect to="login"></Redirect></Route>
    );
}

export default AuthRoute;