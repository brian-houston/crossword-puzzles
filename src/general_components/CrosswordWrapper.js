import React, { useEffect, useState, useContext } from 'react';
import db from "../firebase/Firestore";
import { AuthContext } from "../firebase/AuthContext";
import $ from 'jquery'; 
import Crossword from '../crossword_components/controller/Crossword';
import {Spinner} from 'react-bootstrap'

function CrosswordWrapper(props) {
    const {user} = useContext(AuthContext); 
    const [data, setData] = useState(null);

    let handleSave = (letters, correctness) => {
        if (!!user) {
            db.collection("users").doc(user.uid).set({
                [data.date]: {
                    title: data.title,
                    letters: letters,
                    correctness: correctness,
                    timeSaved: Date.now()
                }
            }, {merge: true});
        }
    }

    useEffect(() => {
        if (props.location.date) {
            let callback = (puzzle) => setData(puzzle);
            $.getJSON("https://www.xwordinfo.com/JSON/Data.aspx?callback=?", { date: props.location.date }, callback);
        }
    }, [props.location.date]);

    return (
        data ? <Crossword data={data} initialLetters={props.location.initialLetters} initialCorrectness={props.location.initialCorrectness} handleSave={handleSave}> </Crossword> : (
            <div className='d-flex' style={{height: 'calc(100vh - 65px)'}}>
                <Spinner animation="border" variant='primary' className='m-auto d-block'></Spinner>
            </div>
        )
    );
}

export default CrosswordWrapper;