const turnMap = ['O', 'X'];
const mapSize = 5;

let currentTurn = 0;

let map;

function generateMap(squareSize) {
  if (!squareSize || isNaN(squareSize)) {
    throw new Error('Number not entered');
  }
  
  let row = [];
  let map = [];
  for (let i = 0; i < squareSize; i += 1) {
    row.push('');
  }
  for (let i = 0; i < squareSize; i += 1) {
    map.push([...row]);
  }
  
  return map;
}

function drawMap(map) {
  const wrapper = document.querySelector('#container');
  wrapper.innerHTML = '';
  for (let col = 0; col < map.length; col += 1) {
    const htmlRow = document.createElement('div');
    htmlRow.classList.add('row');
    for (let row = 0; row < map[col].length; row += 1) {
      const htmlItem = document.createElement('div');
      htmlItem.classList.add('square');
      htmlItem.dataset['row'] = col;
      htmlItem.dataset['item'] = row;
      htmlRow.appendChild(htmlItem);
    }
    wrapper.appendChild(htmlRow);
  }
}

function startNewGame() {
  map = generateMap(mapSize);
  
  currentTurn = 0;
  
  document.querySelectorAll('.square').forEach((item) => {
    item.innerHTML = '';
  })
}

function checkWin() {
  let won = true;
  
  for (let row = 0; row < map.length; row += 1) {
    if (map[row].every((item) => item === turnMap[ currentTurn ])) {
      return true;
    }
  }
  
  for (let col = 0; col < map.length; col += 1) {
    if (map[0][col] === turnMap[currentTurn] &&
        map[1][col] === turnMap[currentTurn] &&
        map[2][col] === turnMap[currentTurn]) {
      return true;
    }
  }
  
  for (let diagonal = 0; diagonal < map.length; diagonal += 1) {
  
    if (map[ diagonal ][ diagonal ] !== turnMap[ currentTurn ]) {
      won = false;
    }
  
    if (map[map.length - diagonal - 1][diagonal] !== turnMap[currentTurn]) {
      won = false;
    }
  }
  
  return won;
}

function checkDraw() {
  for (let column = 0; column < map.length; column += 1) {
    for (let row = 0; row < map[column].length; row += 1) {
      if (map[column][row] === '') {
        return false;
      }
    }
  }
  return true;
}

function nextTurn() {
  if (currentTurn === 0) {
    currentTurn = 1;
  } else {
    currentTurn = 0;
  }
}


function onUserSquareClick(event) {
  if (!event.target.classList.contains('square')) {
    return;
  }
  const elementData = event.target.dataset;
  
  if (map[elementData.row][elementData.item] !== '') {
    return;
  }
  event.target.innerHTML = turnMap[currentTurn];
  map[elementData.row][elementData.item] = turnMap[currentTurn];
  if (checkWin()) {
    alert(turnMap[currentTurn] + ' won');
    startNewGame();
  } else if (checkDraw()) {
    alert('DRAW, no one win');
    startNewGame();
  }
  console.log('user click', map);
  nextTurn();
}


function main() {
  drawMap(generateMap(mapSize));
  startNewGame();
  document.querySelector('#container').addEventListener('click', onUserSquareClick);
}

document.addEventListener("DOMContentLoaded", main);
