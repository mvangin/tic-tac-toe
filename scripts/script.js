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
    const aiToggle = document.querySelector('.aiToggle');



    var gameBoard = ["", "", "",
        "", "", "",
        "", "", ""];

    let ai = false;
    const gameBoardFunc = (() => {
        let i = 0
        boardSquares.forEach((item) => {
            item.dataset.gridValue = i;
            i++;
        });
    })();

    var PlayerFactory = (playerName, playerSymbol) => {
        return { playerName, playerSymbol };
    }

    startGame.addEventListener("click", () => {
        initializeGame();
    });

    aiToggle.addEventListener("click", () => {
        ai = true;
        initializeGame();
    });


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
        let player2Name;

        if (ai == true) {
            player2Name = "AI"
        } else {
            player2Name = player2NameEle.value;
        }


        player1 = PlayerFactory(player1Name, "X");
        player2 = PlayerFactory(player2Name, "0");
        player1Div.textContent = player1.playerName;
        player2Div.textContent = player2.playerName;
        currentPlayer = player1;
        player2Div.classList.remove("currentPlayer");
        player1Div.classList.add("currentPlayer");

        updateGameBoard();
        playerPress();
    }


    function updateGameBoard() {
        let i = 0
        boardSquares.forEach((item) => {
            item.textContent = gameBoard[i];
            i++;
        });
    }


    function playerPress() {
        boardSquares.forEach((item) => {
            item.addEventListener("click", playerEntry, true);
        });
    }

    function aiMove() {
        let aiOptions = [];
        for (let index = 0; index < gameBoard.length; index++) {
            if (gameBoard[index] == "") {
                aiOptions.push(index);
            }
        }
        let numChoices = aiOptions.length;
        let aiChoice = Math.floor(Math.random() * Math.floor(numChoices));

        gameBoard[aiOptions[aiChoice]] = "0";
    }



    function removePress() {
        boardSquares.forEach((item) => {
            item.removeEventListener("click", playerEntry, true);

        })
    }


    function playerEntry(e) {

        let index = e.target.dataset.gridValue;
        if (!ai) {
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
                updateGameBoard(index);
                determineWinner();
            }
        } else {
            if (gameBoard[index] == "") {
                gameBoard[index] = "X";
                aiMove();
            }
        }
        updateGameBoard(index);
        determineWinner();

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
                ai = false;
                removePress();


            }
        });

        if (!gameBoard.includes("") && winner.textContent == "") {
            winner.textContent = "Its a tie!";
            playersWrapper.style.display = "none";
            startButtons.style.display = "flex";
            ai = false;
            removePress();
        }
    }


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


}());


