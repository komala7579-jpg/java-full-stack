const board = document.getElementById("board");
const diceDisplay = document.getElementById("dice");

// Make the board (100 cells)
for (let i = 100; i >= 1; i--) {
  let cell = document.createElement("div");
  cell.className = "cell";
  cell.textContent = i;
  board.appendChild(cell);
}

// Player starts at position 1
let playerPos = 1;
let player = document.createElement("div");
player.className = "player";
board.children[99].appendChild(player);

// Snakes and ladders with labels
let snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
let ladders = { 2: 38, 7: 14, 8: 31, 15: 26, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 88: 94 };

// Add labels for ladders
let ladderCount = 1;
for (let start in ladders) {
  let end = ladders[start];
  board.children[100 - start].textContent += " L" + ladderCount + "up";
  board.children[100 - end].textContent += " L" + ladderCount + "reached";
  ladderCount++;
}

// Add labels for snakes
let snakeCount = 1;
for (let start in snakes) {
  let end = snakes[start];
  board.children[100 - start].textContent += " S" + snakeCount + "X";
  board.children[100 - end].textContent += " S" + snakeCount;
  snakeCount++;
}

// Roll dice
function rollDice() {
  let dice = Math.floor(Math.random() * 6) + 1;
  diceDisplay.textContent = "You rolled: " + dice;
  movePlayer(dice);
}

// Move player
function movePlayer(dice) {
  playerPos += dice;
  if (playerPos > 100) playerPos = 100;

  if (snakes[playerPos]) playerPos = snakes[playerPos];
  if (ladders[playerPos]) playerPos = ladders[playerPos];

  updatePlayer();

  if (playerPos === 100) alert("🎉 You won!");
}

// Update player position
function updatePlayer() {
  document.querySelectorAll(".player").forEach(p => p.remove());
  let index = 100 - playerPos;
  board.children[index].appendChild(player);
}
