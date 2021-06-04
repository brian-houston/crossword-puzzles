import React from "react";
import { Nav, Navbar, Button } from 'react-bootstrap';
import CrosswordDropdown from './CrosswordDropdown';
import "./CrosswordToolbar.css"

function CrosswordToolbar(props) {
    return (
        <Navbar style={{height: "50px"}}>
            <Navbar.Brand className='text-muted'>
                {props.title}
            </Navbar.Brand>
            <Nav className='ml-auto'>
                <CrosswordDropdown
                    title = {"Check"}
                    options = {["Letter", "Word", "Puzzle"]}
                    callback = {props.handleCheckClick}
                ></CrosswordDropdown>
                <CrosswordDropdown
                    title = {"Reveal"}
                    options = {["Letter", "Word", "Puzzle"]}
                    callback = {props.handleRevealClick}
                ></CrosswordDropdown>
                <CrosswordDropdown
                    title = {"Clear"}
                    options = {["Word", "Puzzle"]}
                    callback = {props.handleClearClick}
                ></CrosswordDropdown>

                <Button variant="outline-success" className = 'mx-3' onClick={props.handleSave}>Save</Button>
            </Nav>
        </Navbar>
    );
}

export default CrosswordToolbar;