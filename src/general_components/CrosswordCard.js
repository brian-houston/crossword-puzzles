import React from 'react';
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom';

function CrosswordCard(props) {
    let objDate = new Date(props.timeSaved);
    let strDate = objDate.toLocaleTimeString('en-US') + ' ' + objDate.toDateString();
    return (
        <Card className='mx-auto mt-3 bg-light'>
            <Link 
                to={{
                    pathname: "/play",
                    date: props.date,
                    initialLetters: props.initialLetters,
                    initialCorrectness: props.initialCorrectness,
                    }}
            >
                <Card.Body className='text-dark'>
                    <Card.Text>{props.title}</Card.Text>
                </Card.Body>
            </Link>
            <Card.Footer><small>{strDate}</small></Card.Footer>
        </Card>  
    );
}

export default CrosswordCard;