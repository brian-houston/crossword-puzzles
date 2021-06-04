import React, { useContext } from "react";
import firebase from "firebase";
import { AuthContext } from "../firebase/AuthContext";
import {Navbar, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Logo from '../cw_icon.svg'

function TopBar(props) {
    const {user} = useContext(AuthContext); 

    let handleSignOut = () => {
        firebase.auth().signOut();
    }

    return (
        <Navbar bg="primary" variant="dark" style={{height: "50px"}}>
            <Link to={!!user ? '/home' : '/login'}>
                <Navbar.Brand>
                <img
                    alt=""
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top mr-3"
                />
                    Crossword Puzzles
                </Navbar.Brand>
            </Link>

            {!!user ? <Button className='ml-auto' onClick={handleSignOut}> Sign Out </Button> : null}
        </Navbar>
    );
}

export default TopBar;