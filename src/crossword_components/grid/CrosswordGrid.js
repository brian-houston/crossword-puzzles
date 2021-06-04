import React from 'react';
import "./CrosswordGrid.css"
import CrosswordRow from './CrosswordRow';

function CrosswordGrid(props) {
    let rowNums = [];
    
    for (let i = 0; i < props.size.rows; i++) {
        rowNums.push(i);
    }

    let rowElements = rowNums.map((val) => {
        let rowStart = val*props.size.cols;
        let rowEnd = (val+1)*props.size.cols;
        return <CrosswordRow 
            size={props.size}
            rows = {{
                letters: props.grids.letters.slice(rowStart, rowEnd),
                numbers: props.grids.numbers.slice(rowStart, rowEnd),
                colors: props.grids.colors.slice(rowStart, rowEnd),
                correctness: props.grids.correctness.slice(rowStart, rowEnd),
                circles: props.grids.circles.slice(rowStart, rowEnd)
            }}
            startId={val*props.size.cols}
            key={val*props.size.cols}
            handleLetterBoxClick = {props.handleLetterBoxClick}
        ></CrosswordRow>
    });

    let fontSize = 100/props.size.cols*0.6;

    return (
        <div className="CrosswordGrid" style={{fontSize: fontSize+'vh'}}>
            {rowElements}
        </div>
    );
}

export default CrosswordGrid;