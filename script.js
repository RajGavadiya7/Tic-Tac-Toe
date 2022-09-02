// Vars
var check = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1],
];
var currenPlayer = 1;

// 1 == "X"
// 0 == "O"

// Selecting Elements
const cells = document.querySelectorAll(".cell");

// Add Event Listners
document.querySelector(".ok").addEventListener("click", function () {
  var popUp = document.querySelector(".pop-up-background");
  popUp.style.opacity = 0;
  popUp.style.zIndex = -10;
});

document.querySelector(".reset").addEventListener("click", () => resetGame());
document.querySelector(".clear").addEventListener("click", () => clearGame());

cells.forEach(function (cell) {
  cell.addEventListener("click", function () {
    var cellImg = cell.querySelector("img");
    if (cellImg.src.charAt(cellImg.src.length - 1) != "g") {
      if (currenPlayer == 1) {
        cellImg.src = "./images/zero.svg";
        cellImg.style.zIndex = 3;
        currenPlayer = 0;
      } else {
        cellImg.src = "./images/cross.svg";
        cellImg.style.zIndex = 3;
        currenPlayer = 1;
      }
      document.querySelectorAll(".name")[0].classList.toggle("current");
      document.querySelectorAll(".name")[1].classList.toggle("current");
      setMatrix(cell.getAttribute("id"));
    }
  });
});

// Functions
// To check Winner
function checkWinner() {
  // check all rows
  for (i = 0; i < 3; i++) {
    if (
      check[i][0] == check[i][1] &&
      check[i][1] == check[i][2] &&
      (check[i][0] == 1 || check[i][0] == 0)
    ) {
      if (check[i][0] == 1) {
        showWinner(1);
        setScore(1);
      } else {
        showWinner(0);
        setScore(0);
      }
    }
  }

  // check all columns
  for (i = 0; i < 3; i++) {
    if (
      check[0][i] == check[1][i] &&
      check[1][i] == check[2][i] &&
      (check[0][i] == 1 || check[0][i] == 0)
    ) {
      if (check[0][i] == 1) {
        showWinner(1);
        setScore(1);
      } else {
        showWinner(0);
        setScore(0);
      }
    }
  }

  // check two diagonal

  if (
    check[0][0] == check[1][1] &&
    check[1][1] == check[2][2] &&
    check[0][0] != -1
  ) {
    if (check[0][0] == 1) {
      showWinner(1);
      setScore(1);
    } else {
      showWinner(0);
      setScore(0);
    }
  }

  if (
    check[0][2] == check[1][1] &&
    check[1][1] == check[2][0] &&
    check[1][1] != -1
  ) {
    if (check[1][1] == 1) {
      showWinner(1);
      setScore(1);
    } else {
      showWinner(0);
      setScore(0);
    }
  }

  // Nobody wins Match tie

  var temp = 0;
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      if (check[i][j] == -1) {
        temp++;
      }
    }
  }
  if (temp == 0) {
    showWinner(-1);
  }
}

// To show winner
function showWinner(player) {
  let winner;
  if (player == -1) {
    winner = "This game was a Tie";
  } else {
    winner = document
      .querySelectorAll(".name")
      [player].querySelector("input").value;
    winner = "The game won by " + winner;
  }
  var popUp = document.querySelector(".pop-up-background");
  popUp.style.opacity = 1;
  popUp.style.zIndex = 10;
  popUp.querySelector(".winner").innerText = winner;
  clearGame();
}

// To reset the game
function setMatrix(id) {
  var x = id[0];
  var y = id[2];
  check[x][y] = currenPlayer;
  checkWinner();
}

// To clear the matrix
function clearGame() {
  check = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  currenPlayer = 1;
  document.querySelectorAll(".name")[0].classList.remove("current");
  document.querySelectorAll(".name")[1].classList.remove("current");
  document.querySelectorAll(".name")[0].classList.add("current");
  cells.forEach(function (cell) {
    cell.querySelector("img").style.zIndex = -1;
    cell.querySelector("img").src = "#";
  });
}

// To reset board
function resetGame() {
  clearGame();
  document.querySelector("#scoreO").innerText = 0;
  document.querySelector("#scoreX").innerText = 0;
}

// To set score
function setScore(player) {
  var count;
  if (player == 0) {
    count = toNumber(document.querySelector("#scoreO").innerText);
    document.querySelector("#scoreO").innerText = count + 1;
  } else if (player == 1) {
    count = toNumber(document.querySelector("#scoreX").innerText);
    document.querySelector("#scoreX").innerText = count + 1;
  }
}

// To convert string to number
function toNumber(data) {
  let number = 0;
  for (n of data) {
    number *= 10;
    number += n - "0";
  }
  return number;
}
