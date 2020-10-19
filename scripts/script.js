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
    const aiToggleRedBG = document.querySelector('.aiToggleRedBG');

    let delay = 1000;

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
        aiToggle.classList.toggle("aiToggleRedBG");
        ai = ai ? false : true
    });



    function initializeGame() {

        clearGame();

        const player1NameEle = document.querySelector('#player1NameEle');
        const player2NameEle = document.querySelector('#player2NameEle');

        let player1Name = player1NameEle.value;
        let player2Name;

        if (ai) {
            player2Name = player2NameEle.value + " (AI)"
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

    function clearGame() {
        winner.textContent = "";
        gameBoard = ["", "", "",
            "", "", "",
            "", "", ""];
        startButtons.style.display = "none";
        playerNamesWrapper.style.display = "none";
        playersWrapper.style.display = "flex";
    }

    function updateGameBoard(aiIndex) {
        let i = 0
        boardSquares.forEach((item) => {
            if (i === aiIndex) {
                setTimeout(() => {
                    item.textContent = gameBoard[aiIndex];
                }, delay)

            } else {
                item.textContent = gameBoard[i];
            }
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
        let aiIndex = aiOptions[aiChoice]
        gameBoard[aiIndex] = player2.playerSymbol;
        return aiIndex;

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
                    gameBoard[index] = player1.playerSymbol;
                    determineWinner(player1)
                    player2Div.classList.add("currentPlayer");
                    player1Div.classList.remove("currentPlayer");
                } else {
                    gameBoard[index] = player2.playerSymbol;
                    determineWinner(player2)
                    player1Div.classList.add("currentPlayer");
                    player2Div.classList.remove("currentPlayer");
                }
                updateGameBoard();
                changePlayer();

            }
        } else {
            if (gameBoard[index] == "") {
                gameBoard[index] = player1.playerSymbol;
                updateGameBoard();
                let finishedGame = determineWinner(player1);

                if (!finishedGame) {
                    removePress();
                    player2Div.classList.add("currentPlayer");
                    player1Div.classList.remove("currentPlayer");
                    let aiIndex = aiMove()
                    updateGameBoard(aiIndex);
                    setTimeout(() => {
                        player1Div.classList.add("currentPlayer");
                        player2Div.classList.remove("currentPlayer");
                        playerPress()
                        determineWinner(player2)
                    }, delay)
                }
            }
        }

    }

    function determineWinner(player) {

        const winningCombo = player.playerSymbol + player.playerSymbol + player.playerSymbol;
        if (((gameBoard[0] + gameBoard[1] + gameBoard[2]) == winningCombo) ||
            ((gameBoard[3] + gameBoard[4] + gameBoard[5]) == winningCombo) ||
            ((gameBoard[6] + gameBoard[7] + gameBoard[8]) == winningCombo) ||
            ((gameBoard[0] + gameBoard[3] + gameBoard[6]) == winningCombo) ||
            ((gameBoard[1] + gameBoard[4] + gameBoard[7]) == winningCombo) ||
            ((gameBoard[2] + gameBoard[5] + gameBoard[8]) == winningCombo) ||
            ((gameBoard[0] + gameBoard[4] + gameBoard[8]) == winningCombo) ||
            ((gameBoard[2] + gameBoard[4] + gameBoard[6]) == winningCombo)) {
            let winnerText = player.playerName + " is the winner!";
            endgame(winnerText);
            return true;
        }

        if (!gameBoard.includes("") && winner.textContent == "") {
            let winnerText = "Its a tie!";
            endgame(winnerText);
        }
    }

    function endgame(winnerText) {
        winner.textContent = winnerText;
        playersWrapper.style.display = "none";
        startButtons.style.display = "flex";
        removePress();
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


