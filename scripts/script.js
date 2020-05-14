
var gameBoard = (function () {
    const boardSquares = document.querySelectorAll('.boardSquare');
    const playerChoice = document.querySelector('.playerChange')
    const startGame = document.querySelector('.startGame')
    const winner = document.querySelector('.winner');
    const player1Div = document.querySelector('.player1');
    const player2Div = document.querySelector('.player2');


    var gameBoard = ["", "", "",
        "", "", "",
        "", "", ""];

    var player = (playerName, playerSymbol) => {
        return { playerName, playerSymbol };
    }

  
    const player1 = player("player1", "X");
    const player2 = player("player2", "0");

    let currentPlayer = player1;

    function gameBoardFunc() {

        let i = 0
        boardSquares.forEach((item) => {
            item.dataset.gridValue = i;
            i++;
        });
    }

    gameBoardFunc();


    function updateGameBoard() {
        let i = 0
        boardSquares.forEach((item) => {
            item.textContent = gameBoard[i];
            i++;
        });
    }



    function determineWinner() {

        let players = [player1, player2];

        players.forEach((player) => {
            const winningCombo = player.playerSymbol + player.playerSymbol + player.playerSymbol;
            if (((gameBoard[0] + gameBoard[1] + gameBoard[2]) == winningCombo) ||
                ((gameBoard[3] + gameBoard[4] + gameBoard[5]) == winningCombo) ||
                ((gameBoard[6] + gameBoard[7] + gameBoard[8]) == winningCombo) ||
                ((gameBoard[0] + gameBoard[3] + gameBoard[6]) == winningCombo) ||
                ((gameBoard[1] + gameBoard[4] + gameBoard[7]) == winningCombo) ||
                ((gameBoard[2] + gameBoard[5] + gameBoard[8]) == winningCombo) ||
                ((gameBoard[0] + gameBoard[4] + gameBoard[8]) == winningCombo) ||
                ((gameBoard[2] + gameBoard[4] + gameBoard[6]) == winningCombo)) {
                winner.textContent = player.playerName + " is the winner!";
                startGame.style.display = "inline";
                removePress();

            }
        });

        if (!gameBoard.includes("") && winner.textContent == "") {
            winner.textContent = "Its a tie!";
            startGame.style.display = "inline";
            removePress();
        }
    }


        function clearGame() {
            gameBoard = ["", "", "",
                "", "", "",
                "", "", ""];
            currentPlayer = player1;
            winner.textContent = "";
            updateGameBoard();
        }



        startGame.addEventListener("click", () => {
            startGame.style.display = "none";
            clearGame();
            playerPress();

        });


        function changePlayer() {
            if (currentPlayer == player1) {
                currentPlayer = player2;
                player1Div.classList.add("currentPlayer");
                player2Div.classList.remove("currentPlayer");

            } else {
                currentPlayer = player1;
                player2Div.classList.add("currentPlayer");
                player1Div.classList.remove("currentPlayer");
            }
        }

        function playerPress() {
            boardSquares.forEach((item) => {
                item.addEventListener("click", playerEntry, true);
            });
        }

        function removePress() {
            boardSquares.forEach((item) => {
                item.removeEventListener("click", playerEntry, true);

            })
        }


        function playerEntry(e) {

            let index = e.target.dataset.gridValue;
            if (gameBoard[index] == "") {
                if (currentPlayer == player1) {
                    gameBoard[index] = "X";
                } else {
                    gameBoard[index] = "0";
                }
                changePlayer();


            }
            updateGameBoard(index);
            determineWinner();


        }


    } ());


