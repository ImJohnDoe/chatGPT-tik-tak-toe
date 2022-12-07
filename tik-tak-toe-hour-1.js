// Define the dimensions of the game board
const BOARD_SIZE = 3;

// Define the values for each player's game pieces
const PLAYER_X = "X";
const PLAYER_O = "O";

// Define the initial state of the game board
let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

// Define a function for checking if a specific player has won the game
function hasPlayerWon(player) {
    // Check if the player has claimed all of the spaces in a row
    for (let row = 0; row < BOARD_SIZE; row++) {
        let hasWon = true;
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (gameBoard[row][col] !== player) {
                hasWon = false;
                break;
            }
        }
        if (hasWon) return true;
    }

    // Check if the player has claimed all of the spaces in a column
    for (let col = 0; col < BOARD_SIZE; col++) {
        let hasWon = true;
        for (let row = 0; row < BOARD_SIZE; row++) {
            if (gameBoard[row][col] !== player) {
                hasWon = false;
                break;
            }
        }
        if (hasWon) return true;
    }

    // Check if the player has claimed all of the spaces in a diagonal
    let hasWon = true;
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (gameBoard[i][i] !== player) {
            hasWon = false;
            break;
        }
    }
    if (hasWon) return true;

    hasWon = true;
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (gameBoard[i][BOARD_SIZE - 1 - i] !== player) {
            hasWon = false;
            break;
        }
    }
    if (hasWon) return true;

    // If the player has not won, return false
    return false;
}

// Test 1: Player X claims a row of spaces
gameBoard = [
    [PLAYER_X, PLAYER_X, PLAYER_X],
    [null, null, null],
    [null, null, null]
];
console.assert(hasPlayerWon(PLAYER_X) === true);

// Test 2: Player O claims a column of spaces
gameBoard = [
    [null, null, PLAYER_O],
    [null, null, PLAYER_O],
    [null, null, PLAYER_O]
];
console.assert(hasPlayerWon(PLAYER_O) === true);

// Test 3: Player X claims a diagonal of spaces
gameBoard = [
    [PLAYER_X, null, null],
    [null, PLAYER_X, null],
    [null, null, PLAYER_X]
];
console.assert(hasPlayerWon(PLAYER_X) === true);

// Test 4: Player O has not yet won the game
gameBoard = [
    [null, null, PLAYER_O],
    [null, PLAYER_X, null],
    [null, null, PLAYER_X]
];
console.assert(hasPlayerWon(PLAYER_O) === false);

// Test 5: The game board is full and player X has won
gameBoard = [
    [PLAYER_X, PLAYER_O, PLAYER_X],
    [PLAYER_O, PLAYER_X, PLAYER_O],
    [PLAYER_X, PLAYER_O, PLAYER_X]
];
console.assert(hasPlayerWon(PLAYER_X) === true);
console.assert(hasPlayerWon(PLAYER_O) === false);

// Test 6: The game board is full but no player has won
gameBoard = [
    [PLAYER_X, PLAYER_O, PLAYER_X],
    [PLAYER_O, PLAYER_O, PLAYER_X],
    [PLAYER_X, PLAYER_X, PLAYER_O]
];
console.assert(hasPlayerWon(PLAYER_X) === false);
console.assert(hasPlayerWon(PLAYER_O) === false);

// Define a function for checking if the game has ended
function hasGameEnded() {
    // Check if any player has won the game
    if (hasPlayerWon(PLAYER_X) || hasPlayerWon(PLAYER_O)) {
        return true;
    }

    // Check if the game board is full
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            if (gameBoard[row][col] === null) {
                return false;
            }
        }
    }

    // If the game board is full and no player has won, the game has ended in a draw
    return true;
}

// Test 1: The game has not yet ended
gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
console.assert(hasGameEnded() === false);

// Test 2: The game has ended in a win for player X
gameBoard = [
    [PLAYER_X, null, null],
    [null, PLAYER_X, null],
    [null, null, PLAYER_X]
];
console.assert(hasGameEnded() === true);

// Test 3: The game has ended in a win for player O
gameBoard = [
    [null, null, PLAYER_O],
    [null, PLAYER_O, null],
    [PLAYER_O, null, null]
];
console.assert(hasGameEnded() === true);

// Test 4: The game board is full but no player has won
gameBoard = [
    [PLAYER_X, PLAYER_O, PLAYER_X],
    [PLAYER_O, PLAYER_X, PLAYER_O],
    [PLAYER_O, PLAYER_X, PLAYER_X]
];
console.assert(hasGameEnded() === true);

// Test 5: The game has not yet ended, but the board is partially full
gameBoard = [
    [PLAYER_X, PLAYER_O, null],
    [null, null, null],
    [null, null, null]
];
console.assert(hasGameEnded() === false);

// Define a function for placing a player's game piece on the game board
function placePiece(player, row, col) {
    // Check if the specified space is out-of-bounds
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
        return;
    }

    // Check if the specified space is occupied
    if (gameBoard[row][col] !== null) {
        return;
    }

    // Place the player's game piece on the game board
    gameBoard[row][col] = player;
}

// Define the initial state of the game board
gameBoard = [[null, null, null],
[null, null, null],
[null, null, null]
];

// Test 1: Player X places a piece on an empty space
placePiece(PLAYER_X, 0, 0);
console.assert(gameBoard[0][0] === PLAYER_X);

// Test 2: Player O places a piece on an empty space
placePiece(PLAYER_O, 2, 2);
console.assert(gameBoard[2][2] === PLAYER_O);

// Test 3: Player X attempts to place a piece on an occupied space
placePiece(PLAYER_X, 0, 0);
console.assert(gameBoard[0][0] === PLAYER_X);

// Test 4: Player O attempts to place a piece on an occupied space
placePiece(PLAYER_O, 0, 0);
console.assert(gameBoard[0][0] === PLAYER_X);

// Test 5: Player X attempts to place a piece on an out-of-bounds space
placePiece(PLAYER_X, -1, 0);
// Verify that the game board has not changed
for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
        if (row === 0 && col === 0) {
            console.assert(gameBoard[row][col] === PLAYER_X);
        } else if (row === 2 && col === 2) {
            console.assert(gameBoard[row][col] === PLAYER_O);
        } else {
            console.assert(gameBoard[row][col] === null);
        }
    }
}    