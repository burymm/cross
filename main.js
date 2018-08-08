const turnMap = ['O', 'X'];
const turnClass = ['o-class', 'x-class'];
const mapSize = 8;
const countToWin = 5;

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
  drawMap(map);
  
  currentTurn = 0;
  
  document.querySelectorAll('.square').forEach((item) => {
    item.innerHTML = '';
  })
}

function checkWin() {
  for (let row = 0; row < map.length; row += 1) {
    let elementInRow = 0;
    for (let col = 0; col < map[ row ].length; col += 1) {
      if (map[ row ][ col ] === turnMap[ currentTurn ]) {
        elementInRow += 1;
      }
      
      if (elementInRow === countToWin) {
        return true;
      }
    }
  }
  
  for (let col = 0; col < map.length; col += 1) {
    let elementInCol = 0;
    for (let row = 0; row < map.length; row += 1) {
      if (map[ row ][ col ] === turnMap[ currentTurn ]) {
        elementInCol += 1;
      }
      
      if (elementInCol === countToWin) {
        return true;
      }
    }
  }
  
  let secondDiagonalCount = 0;
  
  for (let diagonal = 0; diagonal < map.length; diagonal += 1) {
    
    if (map[ map.length - diagonal - 1 ][ diagonal ] === turnMap[ currentTurn ]) {
      secondDiagonalCount += 1;
    }
    
    if (secondDiagonalCount === countToWin) {
      return true;
    }
  }
  
  let mainDiagonalBottom = 0;
  let mainDiagonalTop = 0;
  let secondDiagonalTop = 0;
  let secondDiagonalBottom = 0;
  let topIndex = 0;
  
  for (let step = 0; step < map.length; step += 1) {
    mainDiagonalBottom = 0;
    mainDiagonalTop = 0;
    secondDiagonalTop = 0;
    secondDiagonalBottom = 0;
    topIndex = step;
    
    for (let row = step; row < map.length; row += 1) {
      let col = row - step;
      if (map[row][col] === turnMap[ currentTurn ]) {
        mainDiagonalBottom += 1;
      }
  
      if (map[col][row] === turnMap[ currentTurn ]) {
        mainDiagonalTop += 1;
      }
  
      if ((mainDiagonalBottom === countToWin) || (mainDiagonalTop === countToWin)) {
        return true;
      }
  
  
      if (map[row][map.length - row + step - 1] === turnMap[ currentTurn ]) {
        secondDiagonalBottom += 1;
      }
      
      if (secondDiagonalBottom === countToWin) {
        return true;
      }
    }
    
    for (let topIndexRow = 0; topIndexRow < map.length; topIndexRow += 1) {
      if (topIndex >= 0 && map[topIndexRow][topIndex] === turnMap[ currentTurn ]) {
        secondDiagonalTop += 1;
      }
      
      if (secondDiagonalTop === countToWin) {
        return true;
      }
  
      topIndex -= 1;
    }
  }
  
  return false;
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
  event.target.classList.add(turnClass[currentTurn]);
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
  startNewGame();
  document.querySelector('#container').addEventListener('click', onUserSquareClick);
}

document.addEventListener("DOMContentLoaded", main);
