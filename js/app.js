/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [6, 4, 2],
    [0, 4 ,8]
  ]
/*---------------------------- Variables (state) ----------------------------*/
let board 
let turn 
let winner 
let tie 
/*------------------------ Cached Element References ------------------------*/
const resetBtnEl = document.querySelector(`#reset`)
const squareEls = document.querySelectorAll(`.sqr`)
    console.log(squareEls)
const messageEl = document.querySelector(`#message`)
    console.log(messageEl.innerText)
    /*-------------------------------- Functions --------------------------------*/
function init() {
    console.log(
        "it ran"
    )
    board = [``,``,``,``,``,``,``,``,``]; //array
    turn = `X`;
    winner = false;
    tie = false;
    console.log("Begin!");
    console.log(board);
    console.log(turn);
    console.log(winner);
    console.log(tie);
    render();   
}
squareEls.forEach(square => {square.addEventListener(`click`, handleClick)});
function handleClick(event) {
    console.log("handle click")
    const squareIndex = (event.target.id)
    if (board[squareIndex] == `X` || board[squareIndex] == `O`) {return} 
    if (winner == true) {return}
    placePiece(squareIndex)
    //updateBoard()
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render();
}
//function handleClick(event) - references https://chatgpt.com/?oai-dm=1 to see how to construct it

function placePiece(index) {
    console.log("place piece")
    board[index] = turn
}

function checkForWinner() {
    winningCombos.forEach((combo) => {
        let a = board[combo[0]]
        let b = board[combo[1]]
        let c = board[combo[2]]
        if (a !== `` && a == b && a == c) {
            winner = true
        }
    })
}

function checkForTie() {
    if (winner == true) {return}
    function checkFull(square) {
        return square !== ``}
    if (board.every(checkFull)) {tie = true};
}
//******* referenced https://www.w3schools.com/jsref/jsref_every.asp for layout Will Isenberg helped me construct.

// function switchPlayerTurn() {
//      if (winner == true) {return}
//      if (winner == false) {function switchTurn(player) { turn == `X`
//      }}
//      }
function switchPlayerTurn() {
    if (winner) {return}
    else {
        if (turn === 'X') {
            turn = `O`
        } else {
            turn = `X`
        }
    }
}

function updateBoard() {
    squareEls.forEach((tile) => {
        let value = parseInt(tile.getAttribute('id'))
        tile.innerText = board[value]
    })
} 

function updateMessage() {
    if (winner == false && tie == false) {
        messageEl.innerText = `Battle continues ${turn}`
    } else if (winner == false && tie == true) {
        messageEl.innerText = `Tie!`
    } else { 
        messageEl.innerText = `${turn} WINNER WINNER chicken dinner!`
    }
}

function render() {
    updateBoard()
    updateMessage()
}
//****** Will Isenberg helpped guide/teach/coach me through this *******//
/*----------------------------- Event Listeners -----------------------------*/
resetBtnEl.addEventListener(`click`, init)
document.addEventListener("DOMContentLoaded", function() {
    init();
});