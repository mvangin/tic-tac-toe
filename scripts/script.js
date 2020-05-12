const boardSquares = document.querySelectorAll('.boardSquare');
const playerChoice = document.querySelector('.playerChange')
let currentPlayer = "player1";



var gameBoard = (function () {
    var gameBoard = [];

    playerChoice.addEventListener("click", () => {
        changePlayer();
        playerColor()
    });

    playerColor();

    function playerColor() {
        boardSquares.forEach((item) => {
            item.addEventListener("click", (e) => {
                boardSquarePress(e, currentPlayer);
            });
        });
    }
}());


function boardSquarePress(e) {
    if (currentPlayer == "player1") {
        e.target.style.background = "red";
    } else {
        e.target.style.background = "blue";
    }
}

function changePlayer() {
    if (currentPlayer == "player1") {
        currentPlayer = "player2";
    } else {
        currentPlayer = "player1";
    }
    gameBoard;
}