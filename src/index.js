module.exports = function solveSudoku(matrix){
    for (let row = 0; row < 9; row++){
        for (let col = 0; col < 9; col++){

            if (matrix[row][col] === 0) {
                let potencial = possibilities(matrix, row, col);
                let hasTriedSomething = false;

                for (let guess = 1; guess <= 9; guess++){
                    if (potencial[guess]){
                        matrix[row][col] = guess;
                        let solution = solveSudoku(matrix);
                        if (solution) return solution;
                    }
                }
                matrix[row][col] = 0;
                if (!hasTriedSomething) return null;
            }
        }
    }
    return matrix;
}

function possibilities(matrix, row, col){
    let potencial = {1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true, 8:true, 9:true};

    cellSolutionInRow(matrix, row, potencial);
    cellSolutionInCol(matrix, col, potencial);
    cellSolutionInSegment(matrix, row, col, potencial);

    return potencial;
}

function cellSolutionInRow(matrix, row, potencial){
    for (let col = 0; col < 9; col++){
        let cellValue = matrix[row][col];
        potencial[cellValue] = false;
    }
}

function cellSolutionInCol(matrix, col, potencial){
    for (let row = 0; row < 9; row++){
        let cellValue = matrix[row][col];
        potencial[cellValue] = false;
    }
}

function cellSolutionInSegment(matrix, row, col, potencial){
    let minRow = 3 * Math.floor(row / 3);
    let minCol = 3 * Math.floor(col / 3);
    for (let row = minRow; row < minRow + 3; row++){
        for (let col = minCol; col < minCol + 3; col++){
            let cellValue = matrix[row][col];
            potencial[cellValue] = false;
        }
    }
}



