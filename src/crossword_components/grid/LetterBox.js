import React from 'react';
import CorrectnessEnum from "../controller/CorrectnessEnum";
import "./LetterBox.css";


function LetterBox(props) {
    let letterSize = 1/Math.pow(props.attr.letter.length, 0.8);

    let numberTag = props.attr.number === 0 ? null : <p className='LetterBoxNumberTag'>{props.attr.number}</p>
    let letterTag = props.attr.letter === '' ? null : (
        <div className = 'LetterBoxLetterTagContainer' style={{fontSize: letterSize + 'em'}}>
            <p className = 'LetterBoxLetterTag'>{props.attr.letter}</p>
        </div>
    )

    let classNames = 'LetterBox';

    if (props.attr.color === 1) {
        classNames += ' PrimarySelection';
    } else if (props.attr.color === 2) {
        classNames += ' SecondarySelection';
    }

    if (props.attr.correctness === CorrectnessEnum.INCORRECT) {
        classNames += ' Incorrect';
    } else if (props.attr.correctness === CorrectnessEnum.CORRECT_FROM_CHECK) {
        classNames += ' CorrectFromCheck';
    } else if (props.attr.correctness === CorrectnessEnum.CORRECT_FROM_REVEAL) {
        classNames += ' CorrectFromReveal';
    }

    let circle = props.attr.circle === 0 ? null : <div className={'BoxCircle'} style={{width: 'calc((100vh - 100px)/'+props.size.cols+')', height: 'calc((100vh - 100px)/'+props.size.cols+')'}}>

    </div>

    return (
        <div className={classNames} onClick={() => props.handleLetterBoxClick(props.id)}>
            {circle}
            {numberTag}
            {letterTag}
        </div>
    );
}

export default LetterBox;