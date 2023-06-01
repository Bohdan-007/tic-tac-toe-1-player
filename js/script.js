const cells = document.getElementsByClassName('cell');
const winWrapper = document.getElementById('win-wrapper');
const restartBtn = document.getElementById('restart-btn');
const winText = document.getElementById('win-text');

function checkWinner(symbol, arr) {
  const combinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  return combinations.some(combination => combination.every(index => [...arr][index].innerText === symbol));
};

function checkDraw(arr) { return [...arr].every(el => el.innerText !== ''); };


let isCross = true;

// ========== TWO PLAYERS MODE ==========
// for (const cell of cells) {
//   cell.addEventListener('click', (event) => {
//     const symbol = isCross ? 'X' : 'O';
//     const symbolBgc = isCross ? '#dc685a' : '#ecaf4f';
//     const playerWin = isCross ? `Player 1 is win!` : `Player 2 is win!`;


//     if (cell.innerText === '') {
//       event.target.innerText = symbol;
//       event.target.style.backgroundColor = symbolBgc;
//       isCross = !isCross;
//     };


//     if (checkWinner(symbol, cells)) {
//       winWrapper.classList.remove('hide');
//       winText.innerText = playerWin;
//     }
//     else if (checkDraw(cells)) {
//       winWrapper.classList.remove('hide');
//       winText.innerText = 'Is draw!';
//     };


//     // click on restart button
//     restartBtn.addEventListener('click', () => {
//       winWrapper.classList.add('hide');
//       isCross = true;

// [...cells].forEach(cell => {
//   cell.innerText = '';
//   cell.style.backgroundColor = '#78bec5';
// });
//     });

//   });
// };


// ========== ONE PLAYER MODE ==========
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function emptyIndex(arr) {
  const indices = [];
  [...arr].forEach((element, index) => { if (element.innerText === '') indices.push(index); });
  return indices;
};


for (const cell of cells) {
  cell.addEventListener('click', (event) => {
    const symbol = isCross ? 'X' : 'O';
    const symbolBgc = isCross ? '#dc685a' : '#ecaf4f';
    const playerWin = isCross ? `Player 1 is win!` : `Player 2 is win!`;

    let emptyIndexCell;

    if (cell.innerText === '') {
      event.target.innerText = symbol;
      event.target.style.backgroundColor = symbolBgc;
      isCross = !isCross;
      emptyIndexCell = emptyIndex(cells);
    };


    if (checkWinner(symbol, cells)) {
      winWrapper.classList.remove('hide');
      winText.innerText = playerWin;
      isCross = true;
    }
    else if (checkDraw(cells)) {
      winWrapper.classList.remove('hide');
      winText.innerText = 'Is draw!';
      isCross = true;
    };


    setTimeout(() => {
      if (!isCross) {
        emptyIndexCell = emptyIndex(cells);
        const randomCellInd = getRandomIntInclusive(0, emptyIndexCell.length - 1);

        cells[emptyIndexCell[randomCellInd]].innerText = 'O';
        cells[emptyIndexCell[randomCellInd]].style.backgroundColor = '#ecaf4f';

        if (checkWinner('O', cells)) {
          winWrapper.classList.remove('hide');
          winText.innerText = 'Player 2 is win!';
          isCross = true;
        };

        isCross = true;
      };
    }, 300);

    // click on restart button
    restartBtn.addEventListener('click', () => {
      winWrapper.classList.add('hide');
      isCross = true;

      [...cells].forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = '#78bec5';
      });
    });

  });
};