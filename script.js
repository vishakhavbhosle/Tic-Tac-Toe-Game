const gameInfo = document.querySelector('.gameInfo');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function initialize() {
    // Set Current Player to X 
    currentPlayer = 'X';

    // Empty Kar Do Boxes 
    gameGrid = ["", "", "", "", "", "", "", "", ""]

    // Make Boxes Empty on UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";

        // initialise boxes with css properties again
        box.classList = `box box${index + 1}`;
    });

    // Remove Active Class From Button
    newGameBtn.classList.remove("active");

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initialize();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }

    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let winner = "";

    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // check if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
            answer = "O";

            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // now we know X or O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // if we have a winner
    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });

    // when board is filled, game is TIE
    if (fillCount === 9) {
        gameInfo.textContent = "Game Tied !";
        newGameBtn.classList.add("active");
    }


}


function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // swapping turn
        swapTurn();

        // check Winning condition
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


newGameBtn.addEventListener("click", initialize);
