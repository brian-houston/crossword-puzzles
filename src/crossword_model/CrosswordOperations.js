let isValidIndex = function(n, arr) {
    return n > -1 && n < arr.length;
}

export const getBlankCrossword = function(answer) {
    return answer.map((val) => val !== '.' ? '' : '.');
}

const getAcrossNumber = function(i, gridnums, blank, size) {
    if (isValidIndex(i, gridnums) && blank[i] !== '.') {
        let numCols = size.cols;
        for (; i%numCols !== 0 && blank[i-1] !== '.'; i--) {}
        return gridnums[i];
    }

    return -1;
}

const getDownNumber = function(i, gridnums, blank, size) {
    if (isValidIndex(i, gridnums) && blank[i] !== '.') {
        let numCols = size.cols;
        for (;Math.floor(i/numCols) !== 0 && blank[i-numCols] !== '.'; i-=numCols) {}
        return gridnums[i];
    }

    return -1;
}

export const getNumberInDirection = function(i, direction, gridnums, blank, size) {
    if (direction === 'across') {
        return getAcrossNumber(i, gridnums, blank, size);
    }
    return getDownNumber(i, gridnums, blank, size);
}

const getAcrossIndexes = function(num, gridnums, blank, size) {
    let indexes = [];
    let n = gridnums.findIndex((val) => val === num);
    if (n !== -1) {
        let numCols = size.cols;
        indexes.push(n);
        for (let i = n + 1; isValidIndex(i, gridnums) && blank[i] !== '.' && i%numCols !== 0; i++){
            indexes.push(i);
        }
    }

    return indexes;
}

const getDownIndexes = function(num, gridnums, blank, size) {
    let indexes = [];
    let n = gridnums.findIndex((val) => val === num);

    if (n !== -1) {
        let numCols = size.cols;
        indexes.push(n);
        for (let i = n + numCols; isValidIndex(i, gridnums) && blank[i] !== '.' && Math.floor(i/numCols) !== 0; i+=numCols){
            indexes.push(i);
        }
    }

    return indexes;
}

export const getIndexesInDirection = function(num, direction, gridnums, blank, size) {
    if (direction === 'across') {
        return getAcrossIndexes(num, gridnums, blank, size);
    }
    return getDownIndexes(num, gridnums, blank, size);
}

export const getNextNumber = function(num, direction, clues) {
    if (clues[direction][num]) {
        let next = Object.keys(clues[direction]).find((val) => val > num);
        return parseInt(next ? next : Object.keys(clues[direction])[0], 10);
    }

    return parseInt(Object.keys(clues[direction])[0], 10);
}

const getNextAcrossIndex = function(index, blank) {
    let nextIndex = blank.findIndex((val, i) => val !== '.' && i > index);
    return nextIndex === -1 ? blank.findIndex((val, i) => val !== '.') : nextIndex;
}

const getPrevAcrossIndex = function(index, blank) {
    let reverseBlank = blank.slice().reverse();
    return blank.length - getNextAcrossIndex(blank.length - index - 1, reverseBlank) - 1;
}

const getNextDownIndex = function(index, blank, size) {
    let nextIndex = blank.findIndex((val, i) => val !== '.' && i%size.cols === index%size.cols && i > index);
    nextIndex = nextIndex === -1 ? blank.findIndex((val, i) => val !== '.' && i%size.cols === (index%size.cols + 1) % size.cols) : nextIndex;
    return nextIndex;
}

const getPrevDownIndex = function(index, blank, size) {
    let reverseBlank = blank.slice().reverse();
    return blank.length - getNextDownIndex(blank.length - index - 1, reverseBlank, size) - 1;
}

export const getNextIndexInDirection = function(index, direction, blank, size) {
    if (direction === 'across') {
        return getNextAcrossIndex(index, blank);
    }

    return getNextDownIndex(index, blank, size);
}

export const getPrevIndexInDirection = function(index, direction, blank, size) {
    if (direction === 'across') {
        return getPrevAcrossIndex(index, blank);
    }

    return getPrevDownIndex(index, blank, size);
}

