import React from 'react';
import {NavDropdown} from 'react-bootstrap';
import "./CrosswordDropdown.css";

function CrosswordDropdown(props) {


    let optionElements = props.options.map((val, i) => {
        return <NavDropdown.Item key={i} onClick={() => props.callback(val)}>{val}</NavDropdown.Item>
    });

    return (
        <NavDropdown title={props.title} className = 'mx-3'>
            {optionElements}
        </NavDropdown>
    );
}

export default CrosswordDropdown;