import React from 'react';
import "./CrosswordClueColumn.css"
import CrosswordClue from './CrosswordClue';

function CrosswordClueColumn(props) {

    let clueElements = Object.keys(props.clues).map((val, i) => {
        return <CrosswordClue
            key = {i}
            number = {parseInt(val)}
            text = {props.clues[val]}
            direction = {props.direction}
            handleClueClick = {props.handleClueClick}
            isHighlighted = {parseInt(val) === props.highlight.number}
            isPrimary = {props.highlight.isPrimary}
        ></CrosswordClue>
    })

    return (
        <div className='CrosswordClueColumn text-dark'>
            <div className='CrosswordClueColumnTitle'>
                {props.direction.toUpperCase()}
            </div>
            <ol className='CrosswordClueColumnList'>
                {clueElements}
            </ol>
        </div>
    );
}

export default CrosswordClueColumn;