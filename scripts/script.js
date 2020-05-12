
var gameBoard = (function () {
    const boardSquares = document.querySelectorAll('.boardSquare');
    const playerChoice = document.querySelector('.playerChange')
    const startGame = document.querySelector('.startGame')
    const playerTitle = document.querySelector('.playerTitle');


    var gameBoard = [];

    var player = (playerName) => {
        const nameText = playerName + " is now taking their turn";
        return { playerName, nameText};
    }

    const player1 = player("player1");
    const player2 = player("player2")
    let currentPlayer = player1;


    startGame.addEventListener("click", () => {
        startGame.style.display = "none";
        playerTitle.textContent = player1.nameText;
        playerColor();
    });

    playerChoice.addEventListener("click", () => {
        changePlayer();
        playerColor()
    });

    function changePlayer() {
        if (currentPlayer == player1) {
            currentPlayer = player2;
            playerTitle.textContent = player2.nameText;
        } else {
            currentPlayer = player1;
            playerTitle.textContent = player1.nameText;

        }
        playerColor();
    }

    function playerColor() {
        boardSquares.forEach((item) => {
            item.addEventListener("click", (e) => {
                boardSquarePress(e);
            });
        });
    }

    function boardSquarePress(e) {
        if (currentPlayer == player1) {
            e.target.textContent = "X";
        } else {
            e.target.textContent = "O";
        }
    }


}());


