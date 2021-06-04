import React, { useContext } from "react";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import { AuthContext } from "../firebase/AuthContext";
import {Card} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'



function Welcome(props) {
    const {user} = useContext(AuthContext); 
    
    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
    };

    if (!!user) {
        return <Redirect to='/home'></Redirect>
    } else {
        return (
            <div className='d-flex' style={{height: 'calc(100vh - 65px)'}}>
                <Card className='m-auto' style={{width: '400px'}}>
                    <Card.Header className='text-center' as="h3">Welcome</Card.Header>
                    <Card.Body className='text-center' >
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Welcome;