// Define the initial emojis and total pairs
const emojis = ['🐠', '🐙', '🦀', '🐬', '🦑', '🐋', '🦐', '🐚'];
const totalPairs = emojis.length;
const expandedEmojis = ['🐙', '🐡', '🦑', '🐠', '🦐', '🐟', '🦞', '🐬', '🦀', '🐳', '🐋', '🦈', '🦭', '🐊', '🦦', '🦎', '🕊', '🦩'];

// Get the game container and initialize variables
const gameContainer = document.getElementById("game-container");
let selectedTiles = [];
let matchedPairs = 0;

// Create the game board
function createBoard(gridSize) {
    gameContainer.innerHTML = ""; // Clear previous tiles

    const shuffledEmojis = gridSize === 16 ? emojis : expandedEmojis;

    // Shuffle the emojis array
    const shuffledPairs = [...shuffledEmojis, ...shuffledEmojis].sort(() => Math.random() - 0.5);

    for (let i = 0; i < gridSize; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.innerHTML = '<div class="front"></div><div class="back">' + shuffledPairs[i] + '</div>';
        tile.addEventListener("click", () => flipTile(tile));
        gameContainer.appendChild(tile);
    }

    if (gridSize === 16) {
        gameContainer.style.gridTemplateColumns = `repeat(4, 100px)`; // Set grid layout to 4x4 for the original grid
    } else if (gridSize === 36) {
        gameContainer.style.gridTemplateColumns = `repeat(6, 100px)`; // Set grid layout to 6x6 for the expanded grid
    }
}

// Function to expand the grid
function expandGrid() {
    createBoard(36); // Expand grid to 6x6 (36 tiles)
}

// Flip a tile
function flipTile(tile) {
    if (selectedTiles.length < 2 && !selectedTiles.includes(tile)) {
        tile.classList.toggle("flipped");
        selectedTiles.push(tile);

        if (selectedTiles.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

// Check if the selected tiles match
function checkMatch() {
    const [tile1, tile2] = selectedTiles;

    if (tile1.querySelector('.back').textContent === tile2.querySelector('.back').textContent) {
        matchedPairs++;

        if (matchedPairs === totalPairs) {
            alert("Congratulations! You matched all pairs.");
        }
    } else {
        tile1.classList.toggle("flipped");
        tile2.classList.toggle("flipped");
    }

    selectedTiles = [];
}

// Initialize the game
createBoard(16); // Initially create a 4x4 grid

// Button event listener to expand the grid
const expandGridButton = document.getElementById("expand-grid-button");
expandGridButton.addEventListener("click", () => {
    gameContainer.innerHTML = ""; // Clear the existing grid
    createBoard(36); // Create a 6x6 grid
});

