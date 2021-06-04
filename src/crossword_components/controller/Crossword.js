import React, { useEffect, useState } from 'react';
import { getBlankCrossword, getIndexesInDirection, getNextIndexInDirection, getNextNumber, getNumberInDirection, getPrevIndexInDirection } from '../../crossword_model/CrosswordOperations';
import CrosswordLayout from '../layout/CrosswordLayout';
import CorrectnessEnum from './CorrectnessEnum'

function Crossword(props) {
    let blank = getBlankCrossword(props.data.grid);
    let answer = props.data.grid;
    let size = props.data.size;
    let gridNums = props.data.gridnums;

    let [selection, setSelection] = useState({id: 0, direction: 'across'});
    let [currentGrid, setCurrentGrid] = useState(props.initialLetters ? props.initialLetters : blank);
    let [correctnessGrid, setCorrectnessGrid] = useState(props.initialCorrectness ? props.initialCorrectness : blank.map(() => CorrectnessEnum.NONE));
    let [hasWon, setHasWon] = useState(false);

    let clues = {
        across: props.data.clues.across.reduce((acc, cur) => {
            let dotIndex = cur.indexOf('.');
            let num = cur.slice(0, dotIndex);
            let text = cur.slice(dotIndex+2);
            return {...acc, [num]: text}
        }, {}),
        down: props.data.clues.down.reduce((acc, cur) => {
            let dotIndex = cur.indexOf('.');
            let num = cur.slice(0, dotIndex);
            let text = cur.slice(dotIndex+2);
            return {...acc, [num]: text}
        }, {}),
    }

    let handleLetterBoxClick = (id) => {
        if (id === selection.id) {
            setSelection({id: id, direction: selection.direction === 'across' ? 'down' : 'across'});
        } else {
            setSelection({id: id, direction: selection.direction});
        }
    }

    let handleClueClick = (number, direction) => {
        let indexes = getIndexesInDirection(number, direction, props.data.gridnums, blank, size);
        console.log(indexes);
        setSelection({id: indexes[0], direction: direction});
    }

    let handleKeyDown = (e) => {
        if (currentGrid[selection.id] === '.') {
            return;
        }

        let clueNum = getNumberInDirection(selection.id, selection.direction, props.data.gridnums, blank, size);
        let indexes = getIndexesInDirection(clueNum, selection.direction, props.data.gridnums, blank, size);

        if (/^[a-z0-9]$/i.test(e.key)) {
            if (e.repeat) {return}

            if (correctnessGrid[selection.id] === CorrectnessEnum.NONE || correctnessGrid[selection.id] === CorrectnessEnum.INCORRECT) {
                if (e.key.toUpperCase() !== currentGrid[selection.id]) {
                    let newCorrectness = correctnessGrid.slice();
                    newCorrectness[selection.id] = CorrectnessEnum.NONE;
                    setCorrectnessGrid(newCorrectness);
                }
    
                if (e.shiftKey) {
                    if (currentGrid[selection.id].length < 4) {
                        setCurrentGrid(currentGrid.map((val, i) => i === selection.id ? val + e.key.toUpperCase() : val));
                    }
                } else {
                    setCurrentGrid(currentGrid.map((val, i) => i === selection.id ? e.key.toUpperCase() : val));

                    let id = indexes.find((val) => val > selection.id && currentGrid[val] === '');
                    id = id === undefined ? indexes.find((val) => currentGrid[val] === '') : id;
                    id = id === undefined ? indexes.find((val) => val > selection.id) : id;
                    id = id === undefined ? selection.id : id;
                    setSelection({id: id, direction: selection.direction});
                }
            }   
        } else if (e.code === 'Backspace') {
            if (correctnessGrid[selection.id] === CorrectnessEnum.NONE || correctnessGrid[selection.id] === CorrectnessEnum.INCORRECT) {
                setCorrectnessGrid(correctnessGrid.map((val, i) => i === selection.id ? CorrectnessEnum.NONE : val));
                setCurrentGrid(currentGrid.map((val, i) => i === selection.id ? '' : val));
            }
                
            let id = indexes.slice().reverse().find((val) => val < selection.id && blank[val] === '');
            id = id === undefined ? selection.id : id;
            setSelection({id: id, direction: selection.direction})
        } else if (e.code === 'Tab' || e.code === 'Enter') {
            // prevent tab from entering search bar
            e.preventDefault();

            let nextClueNum = getNextNumber(clueNum, selection.direction, clues);
            let indexes = getIndexesInDirection(nextClueNum, selection.direction, props.data.gridnums, blank, size);
            setSelection({id: indexes[0], direction: selection.direction});
        } else if (e.code === 'Space') {
            setSelection({id: selection.id, direction: selection.direction === 'across' ? 'down' : 'across'});
        } else if (e.code === 'ArrowRight') {
            setSelection({id: getNextIndexInDirection(selection.id, 'across', blank, size), direction: 'across'});
        } else if (e.code === 'ArrowLeft') {
            setSelection({id: getPrevIndexInDirection(selection.id, 'across', blank, size), direction: 'across'});
        } else if (e.code === 'ArrowDown') {
            setSelection({id: getNextIndexInDirection(selection.id, 'down', blank, size), direction: 'down'});
        } else if (e.code === 'ArrowUp') {
            setSelection({id: getPrevIndexInDirection(selection.id, 'down', blank, size), direction: 'down'});
        }

        
    }

    let determineCorrectness = (operation, i) => {
        if (operation === "reveal") {
            return correctnessGrid[i] === CorrectnessEnum.CORRECT_FROM_CHECK || correctnessGrid[i] === CorrectnessEnum.CORRECT_FROM_REVEAL ? 
                correctnessGrid[i] : 
                currentGrid[i] === answer[i] ? 
                    CorrectnessEnum.CORRECT_FROM_CHECK : 
                    CorrectnessEnum.CORRECT_FROM_REVEAL;
        } else if (operation === "check") {
            return correctnessGrid[i] === CorrectnessEnum.CORRECT_FROM_CHECK || correctnessGrid[i] === CorrectnessEnum.CORRECT_FROM_REVEAL ? 
                correctnessGrid[i] : 
                currentGrid[i] === answer[i] ? 
                    CorrectnessEnum.CORRECT_FROM_CHECK : 
                    currentGrid[i] === '' ?
                        CorrectnessEnum.NONE :
                        CorrectnessEnum.INCORRECT;
        }
    }


    let handleCheckClick = (option) => {
        if (option === "Letter") {
            let newCorrectness = correctnessGrid.slice();
            newCorrectness[selection.id] = determineCorrectness("check", selection.id);
            setCorrectnessGrid(newCorrectness);
        } else if (option === "Word") {
            let clueNum = getNumberInDirection(selection.id, selection.direction, props.data.gridnums, blank, size);
            let indexes = getIndexesInDirection(clueNum, selection.direction, props.data.gridnums, blank, size);

            let newCorrectness = correctnessGrid.slice();
            indexes.forEach((i) => {
                newCorrectness[i] = determineCorrectness("check", i);
            });

            setCorrectnessGrid(newCorrectness);
        } else if (option === "Puzzle") {
            let newCorrectness = correctnessGrid.map((val, i) => determineCorrectness("check", i));
            setCorrectnessGrid(newCorrectness);
        }
    }


    let handleRevealClick = (option) => {
        if (option === "Letter") {
            let newGrid = currentGrid.slice();
            let newCorrectness = correctnessGrid.slice();

            newGrid[selection.id] = answer[selection.id];
            newCorrectness[selection.id] = determineCorrectness("reveal", selection.id);
            
            setCorrectnessGrid(newCorrectness);
            setCurrentGrid(newGrid);
        } else if (option === "Word") {
            let clueNum = getNumberInDirection(selection.id, selection.direction, props.data.gridnums, blank, size);
            let indexes = getIndexesInDirection(clueNum, selection.direction, props.data.gridnums, blank, size);

            let newGrid = currentGrid.slice();
            let newCorrectness = correctnessGrid.slice();

            indexes.forEach((i) => {
                newGrid[i] = answer[i];
                newCorrectness[i] = determineCorrectness("reveal", i);
            });

            setCurrentGrid(newGrid);
            setCorrectnessGrid(newCorrectness);
        } else if (option === "Puzzle") {
            let newCorrectness = correctnessGrid.map((val, i) => determineCorrectness("reveal", i));
            setCorrectnessGrid(newCorrectness);
            setCurrentGrid(answer);
        }
    }

    let handleClearClick = (option) => {
        if (option === "Word") {
            let clueNum = getNumberInDirection(selection.id, selection.direction, props.data.gridnums, blank, size);
            let indexes = getIndexesInDirection(clueNum, selection.direction, props.data.gridnums, blank, size);

            let newGrid = currentGrid.slice();
            let newCorrectness = correctnessGrid.slice();

            indexes.forEach((i) => {
                newGrid[i] = '';
                newCorrectness[i] = CorrectnessEnum.NONE;
            });

            setCurrentGrid(newGrid);
            setCorrectnessGrid(newCorrectness);
        } else if (option === "Puzzle") {
            setCurrentGrid(blank);
            setCorrectnessGrid(blank.map(() => CorrectnessEnum.NONE));
            setHasWon(false);
        }
    }

    let handleSaveClick = () => {
        props.handleSave(currentGrid, correctnessGrid);
    }

    let getColors = () => {
        let numBoxes = props.data.grid.length;
    
        let colors = Array(numBoxes);
        colors.fill(0);

        let clueNum = getNumberInDirection(selection.id, selection.direction, props.data.gridnums, blank, size);
        let indexes = getIndexesInDirection(clueNum, selection.direction, props.data.gridnums, blank, size);
        indexes.forEach((val) => colors[val] = 2);

        colors[selection.id] = 1;
        return colors;
    }

    let acrossNum = getNumberInDirection(selection.id, 'across', props.data.gridnums, blank, size);
    let downNum = getNumberInDirection(selection.id, 'down', props.data.gridnums, blank, size);

    let grids = {
        letters: currentGrid, 
        numbers: gridNums,
        colors: getColors(),
        correctness: correctnessGrid,
        circles: props.data.circles ? props.data.circles : blank.map(() => 0)
    }

    let handlers = {
        keyDown: handleKeyDown,
        letterBoxClick: handleLetterBoxClick,
        clueClick: handleClueClick,
        checkClick: handleCheckClick,
        revealClick: handleRevealClick,
        clearClick: handleClearClick,
        saveClick: handleSaveClick
    }

    let puzzleProps = {
        title: props.data.title,
        date: props.data.date,
        size: props.data.size,
        num: {across: acrossNum, down: downNum},
        direction: selection.direction,
        clues: clues
    }

    useEffect(() => {
        if (!hasWon) {
            let allMatch = answer.every((val, i) => val === '.' ? true : val === currentGrid[i]);
            setHasWon(allMatch);
        }
    }, [currentGrid]);
   

    return (
        <CrosswordLayout
            grids = {grids}
            handlers = {handlers}
            puzzleProps = {puzzleProps}
            hasWon = {hasWon}
        >   
        </CrosswordLayout>
    );
}

export default Crossword;