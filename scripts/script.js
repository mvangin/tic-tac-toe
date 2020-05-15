
var gameBoard = (function () {
    const boardSquares = document.querySelectorAll('.boardSquare');
    const startGame = document.querySelector('.startGame')
    const winner = document.querySelector('.winner');
    const player1Div = document.querySelector('.player1');
    const player2Div = document.querySelector('.player2');
    const playerNamesWrapper = document.querySelector('.playerNamesWrapper');
    const playersWrapper = document.querySelector('.playersWrapper');
    const startButtons = document.querySelector('.startButtons');
    const changePlayers = document.querySelector('.changePlayers');




    var gameBoard = ["", "", "",
        "", "", "",
        "", "", ""];

    var player = (playerName, playerSymbol) => {
        return { playerName, playerSymbol };
    }


    let player1 = player("player1", "X");
    let player2 = player("player2", "0");
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
                playersWrapper.style.display = "none";
                startButtons.style.display = "flex";
                removePress();

            }
        });

        if (!gameBoard.includes("") && winner.textContent == "") {
            winner.textContent = "Its a tie!";
            playersWrapper.style.display = "none";
            startButtons.style.display = "flex";
            removePress();
        }
    }


    function initializeGame() {
        const player1NameEle = document.querySelector('#player1NameEle');
        const player2NameEle = document.querySelector('#player2NameEle');

        winner.textContent = "";
        gameBoard = ["", "", "",
            "", "", "",
            "", "", ""];
        startButtons.style.display = "none";
        playerNamesWrapper.style.display = "none";
        playersWrapper.style.display = "flex";

        let player1Name = player1NameEle.value;
        let player2Name = player2NameEle.value;
        player1 = player(player1Name, "X");
        player2 = player(player2Name, "0");
        player1Div.textContent = player1.playerName;
        player2Div.textContent = player2.playerName;
        currentPlayer = player1;
        player2Div.classList.remove("currentPlayer");
        player1Div.classList.add("currentPlayer");
        
        updateGameBoard();
        playerPress();
    }



    startGame.addEventListener("click", () => {
        initializeGame();

    });

    changePlayers.addEventListener("click", () => {
        playerNamesWrapper.style.display = "block";
        winner.textContent = "";

    });


    function changePlayer() {
        if (currentPlayer == player1) {
            currentPlayer = player2;

        } else {
            currentPlayer = player1;

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
                player2Div.classList.add("currentPlayer");
                player1Div.classList.remove("currentPlayer");
            } else {
                gameBoard[index] = "0";
                player1Div.classList.add("currentPlayer");
                player2Div.classList.remove("currentPlayer");     
            }
            changePlayer();


        }
        updateGameBoard(index);
        determineWinner();


    }


}());


