const fs = require('fs');

const fileData = fs.readFileSync('./inputFiles/day4.txt', 'utf8');
const inputArray = fileData.split("\n");
//console.log(inputArray);
const randomNumbers = inputArray[0].split(",");

let originalBoards = _prepare2DArray(inputArray);

let startTime = Date.now();
part1();
let endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 1`);

startTime = Date.now();
part2();
endTime = Date.now();
console.log(`${endTime - startTime} milliseconds to complete Part 2`);


function part1(){

    console.log("====== Part 1 =======");

    //console.log("Num List", randomNumbers);
    let boards = originalBoards.slice();

    let foundWinner = false;
    let index = 0;

    do {
        
        const randomNumber = randomNumbers[index];
        //console.log("Number to replace", randomNumber);

        b1 = boards.map((board)=>{
            return _markNumberOnBoard(board, randomNumber);
        });

        boards = b1;
        //console.log(boards);

        winnerBoard = _checkWinnerBoard(boards);
        
        if(winnerBoard){
            foundWinner = true;
            console.log(`Number ${randomNumbers[index]} at index ${index} created winner`);
            console.log("Winner board", winnerBoard);
        }
        else{
            index = index + 1;
        }
        

    } while (!foundWinner && index < 100);


    boardSum = _boardSum(winnerBoard);
    console.log("Board sum:", boardSum);
    console.log("P1 answer: ", boardSum * randomNumbers[index]);

    console.log("________ End of Part 1 ________");
}

function part2(){

    console.log("====== Part 2 =======");
    let boards = originalBoards.slice();

    let index = 0;
    let boardsCopy = boards.slice();
    
    do {
        
        const randomNumber = randomNumbers[index];
        
        b1 = boards.map((board)=>{
            return _markNumberOnBoard(board, randomNumber);
        });

        boards = b1;

        winningBoards = [];
        winningBoardsIndex = _logWinnerBoards(boards);
        
        for (let wbi = 0; wbi < winningBoardsIndex.length; wbi++) {
            const bi = winningBoardsIndex[wbi];
            winningBoards.push(boards[bi]);            
        }

        boards = boards.filter((b,i)=>{
            if(winningBoardsIndex.includes(i)){
            }
            else{
                return b;
            }
        });

        if(boards.length == 0){
            console.log(`Number ${randomNumbers[index]} at index ${index} created last winner`);
            break;
        }
        else{
            index = index + 1;
        }

    } while (index < 100);

    boardSum = _boardSum(winningBoards[0]);
    //boardSum = _boardSum(boards[0]);
    console.log("P2 answer: ", boardSum * randomNumbers[index]);

    console.log("________ End of Part 2 ________");
}

function _prepare2DArray(array){

    // Remove empty lines.
    sanitizedArray = array.filter((v) => {
        if(v.length > 0){ return v };
    });

    let boards = [];

    for (let index = 1; index < sanitizedArray.length; index = index + 5){
        
        let board = [];
        board.push(sanitizedArray[index].split(" ").filter((v)=>{return v === ''? undefined: v}));
        board.push(sanitizedArray[index+1].split(" ").filter((v)=>{return v === ''? undefined: v}));
        board.push(sanitizedArray[index+2].split(" ").filter((v)=>{return v === ''? undefined: v}));
        board.push(sanitizedArray[index+3].split(" ").filter((v)=>{return v === ''? undefined: v}));
        board.push(sanitizedArray[index+4].split(" ").filter((v)=>{return v === ''? undefined: v}));

        boards.push(board);
    }

    //console.log("Boards:", boards);
    return boards;
}

function _markNumberOnBoard(board, number){

    //console.log("Number to replace", number);
    let b = board.map((r) => {
        return r.map((v)=>{return v === number? 'X':v});
    });
    return b;
}

function _checkWinnerBoard(boards){

    let winnerBoard = undefined;

    for (let bi = 0; bi < boards.length; bi++) {
        
        const board = boards[bi];
        
        for (let index = 0; index < board.length; index++) {

            if(board[index][0] === 'X' && board[index][1] === 'X' && board[index][2] === 'X' && board[index][3] === 'X' && board[index][4] === 'X'){
                winnerBoard = board;
                break;
            }

            if(board[0][index] === 'X' && board[1][index] === 'X' && board[2][index] === 'X' && board[3][index] === 'X' && board[4][index] === 'X'){
                winnerBoard = board;
                break;
            }

        }

        if (winnerBoard) {
            console.log(`Board at index ${bi} wins`);
            break;
        }

    };

    return winnerBoard;

}

function _logWinnerBoards(boards){

    let winnerBoard = undefined;
    let winningBoards = [];

    for (let bi = 0; bi < boards.length; bi++) {
        
        const board = boards[bi];
        
        for (let index = 0; index < board.length; index++) {

            if(board[index][0] === 'X' && board[index][1] === 'X' && board[index][2] === 'X' && board[index][3] === 'X' && board[index][4] === 'X'){
                winnerBoard = board;
                break;
            }

            if(board[0][index] === 'X' && board[1][index] === 'X' && board[2][index] === 'X' && board[3][index] === 'X' && board[4][index] === 'X'){
                winnerBoard = board;
                break;
            }

        }

        if (winnerBoard) {
            winningBoards.push(bi);
            winnerBoard = undefined;
        }

    };

    return winningBoards;

}

function _boardSum(board){

    rowSum = board.map((current) => {

        rowSum = current.reduce((p,c)=>{
            if(c === 'X'){return p}
            else{return p + Number(c);}
        },0);

        return rowSum;

    },0);

    console.log("Row Sum", rowSum);
    
    boardSum = rowSum.reduce((prev, current)=> {
        return prev + current;
    }, 0);

    return boardSum;

}