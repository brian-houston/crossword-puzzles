import React from 'react';
import "./CrosswordRow.css"
import LetterBox from './LetterBox';
import ShadedBox from './ShadedBox';

function CrosswordRow(props) {
    let rowBoxes = props.rows.letters.map((val, i) => {
        if (val === '.') {
            return <ShadedBox
                key = {props.startId+i}
            ></ShadedBox>
        } else {
            return <LetterBox
                size = {props.size}
                attr = {{
                    letter: props.rows.letters[i],
                    number: props.rows.numbers[i],
                    color: props.rows.colors[i],
                    correctness: props.rows.correctness[i],
                    circle: props.rows.circles[i]
                }}
                
                id = {props.startId+i}
                key = {props.startId+i}
                handleLetterBoxClick = {props.handleLetterBoxClick}
            ></LetterBox>
        }
    });

    return (
        <div className="CrosswordRow">
            {rowBoxes}
        </div>
    );
}

export default CrosswordRow;