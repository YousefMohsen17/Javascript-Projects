const allBoxes = document.querySelectorAll(".box");
const playButton = document.querySelector("button");
let activePlayer = "X";
let play = false;

// Make Function To Reset The Game After Game Is Finished
const resetGame = function () {
  //  To prevent play again until user click on button again
  play = false;

  playButton.innerHTML = "Play Again";
  playButton.style.display = "block";
  activePlayer = "X";
  allBoxes.forEach((box) => {
    box.innerHTML = "";
    box.classList.remove("x-player", "o-player");
  });
};
const checkWinner = function () {
  //   All scenarios for winning
  const winningcombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  winningcombos.forEach((combo) => {
    const [a, b, c] = combo;
    // To prevent ending game at the beginning as all the boxes have the same html = ""
    if (
      allBoxes[a].innerHTML === "" &&
      allBoxes[b].innerHTML === "" &&
      allBoxes[c].innerHTML === ""
    )
      return;
    else if (
      allBoxes[a].innerHTML === allBoxes[b].innerHTML &&
      allBoxes[b].innerHTML === allBoxes[c].innerHTML
    ) {
      alert(`${allBoxes[a].innerHTML} Is The Winner`);
      resetGame();
    }
    const isDraw = [...allBoxes].every((box) => box.innerHTML !== "");
    if (isDraw) {
      alert("Game Is Draw");
      resetGame();
    }
  });
};

allBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Check the button is clicked and cannot change the box when player play on it
    if (play !== true || box.innerHTML !== "") return;
    const currentClass = activePlayer === "X" ? "x-player" : "o-player";
    box.classList.add(currentClass);
    box.innerHTML = activePlayer;
    activePlayer = activePlayer === "X" ? "O" : "X";
    checkWinner();
  });
});

playButton.addEventListener("click", () => {
  playButton.style.display = "none";
  play = true;
});
