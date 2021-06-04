import React, { useEffect, useRef } from 'react';
import "./CrosswordClue.css"

function CrosswordClue(props) {
    const clueRef = useRef(null);
    useEffect(() => {
        if (props.isHighlighted && clueRef.current ) {
            clueRef.current.scrollIntoView({behavior: window.chrome ? 'auto' : 'smooth', block: "center"});
        }
    }, [props.isHighlighted]);

    let classNames = 'CrosswordClue';
    if (props.isHighlighted) {
        classNames += props.isPrimary ? ' CrosswordCluePrimaryHighlight' : ' CrosswordClueSecondaryHighlight';
    }
    let parser = new DOMParser();
    let clueText = parser.parseFromString(`<!doctype html><body>${props.text}`, 'text/html').body.textContent

    return (
        <li className={classNames} ref={clueRef} onClick={() => props.handleClueClick(props.number, props.direction)}>
            <span className="CrosswordClueNumber">{props.number}</span>
            <span className="CrosswordClueText">{clueText}</span>
        </li>
    );
}

export default CrosswordClue;