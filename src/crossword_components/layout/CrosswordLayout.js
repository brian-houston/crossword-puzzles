import React from 'react';
import CrosswordClueColumn from '../clue/CrosswordClueColumn';
import CrosswordGrid from '../grid/CrosswordGrid';
import CrosswordToolbar from '../toolbar/CrosswordToolbar';
import "./CrosswordLayout.css";
import CrosswordModal from './CrosswordModal';

function CrosswordLayout(props) {
    return (
        <div className="CrosswordComponents" tabIndex="0" onKeyDown={props.handlers.keyDown}>
            <CrosswordModal show={props.hasWon} message={"Congratulations! You solved the puzzle!"}></CrosswordModal>
            <CrosswordToolbar
                title = {props.puzzleProps.title}
                handleCheckClick = {props.handlers.checkClick}
                handleRevealClick = {props.handlers.revealClick}
                handleClearClick = {props.handlers.clearClick}
                handleSave = {props.handlers.saveClick}
            ></CrosswordToolbar>
            <div className="CrosswordGridContainer">
                <CrosswordGrid
                    grids = {props.grids}
                    size = {props.puzzleProps.size}
                    handleLetterBoxClick = {props.handlers.letterBoxClick}
                ></CrosswordGrid>
                <div className="CrosswordColumnContainer">
                    <CrosswordClueColumn
                        clues = {props.puzzleProps.clues.across}
                        direction = {'across'}
                        handleClueClick = {props.handlers.clueClick}
                        highlight = {{number: props.puzzleProps.num.across, isPrimary: props.puzzleProps.direction === 'across'}}
                    ></CrosswordClueColumn>
                    <CrosswordClueColumn
                        clues = {props.puzzleProps.clues.down}
                        direction = {'down'}
                        handleClueClick = {props.handlers.clueClick}
                        highlight = {{number: props.puzzleProps.num.down, isPrimary: props.puzzleProps.direction === 'down'}}
                    ></CrosswordClueColumn>
                </div>
            </div>
        </div>
    );
}

export default CrosswordLayout;