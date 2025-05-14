const playerChoiceContainer = document.querySelector(".player-choice");
const myChoice = document.querySelector(".player-play img");
const computerChoice = document.querySelector(".computer-play img");
const tableContainer = document.querySelector("table tbody");
const resetScore = document.querySelector(".reset-score");
const winsCounter = document.querySelector(".wins");
const drawsCounter = document.querySelector(".draws");
const losesCounter = document.querySelector(".loses");
// *****************
const init = function () {
  const historyStorage = JSON.parse(localStorage.getItem("history")) || [];
  const counterStorage = JSON.parse(localStorage.getItem("counter")) || [];
  historyStorage.forEach((h, index) => {
    const html = ` 
          <tr>
         <td>${index + 1}</td>
         <td>${h.playerChoice}</td>
         <td>${h.pcChoice}</td>
         <td>${h.result}</td>
       </tr>`;
    tableContainer.insertAdjacentHTML("beforeend", html);
    winsCounter.innerHTML = counterStorage.wins;
    drawsCounter.innerHTML = counterStorage.draws;
    losesCounter.innerHTML = counterStorage.loses;
  });
};
const handleGame = function (player, computer) {
  myChoice.src = `images/${player}.png`;
  computerChoice.src = `images/${computer}.png`;
};
const handleResult = function (player, computer) {
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    winsCounter.innerHTML = +winsCounter.innerHTML + 1;
    return "Win";
  } else if (player === computer) {
    drawsCounter.innerHTML = +drawsCounter.innerHTML + 1;

    return "Draw";
  } else {
    losesCounter.innerHTML = +losesCounter.innerHTML + 1;
    return "Lose";
  }
};
playerChoiceContainer.addEventListener("click", (e) => {
  if (e.target.closest(".box")) {
    document.querySelector("thead").classList.remove("hidden");
    const historyStorage = JSON.parse(localStorage.getItem("history")) || [];
    const counterStorage = JSON.parse(localStorage.getItem("counter")) || [];
    const randomImg = ["rock", "paper", "scissors"];
    const randomNum = Math.floor(Math.random() * 3);
    const playerImg =
      e.target
        .closest(".box")
        .querySelector("span")
        .innerHTML.slice(0, 1)
        .toLowerCase() +
      e.target.closest(".box").querySelector("span").innerHTML.slice(1);
    const historyMatches = {
      playerChoice: playerImg,
      pcChoice: randomImg[randomNum],
      result: handleResult(playerImg, randomImg[randomNum]),
    };
    historyStorage.push(historyMatches);
    const html = ` 
    <tr>
   <td>${historyStorage.indexOf(historyMatches) + 1}</td>
   <td>${playerImg}</td>
   <td>${randomImg[randomNum]}</td>
   <td>${historyMatches.result}</td>
 </tr>`;
    localStorage.setItem("history", JSON.stringify(historyStorage));
    localStorage.setItem(
      "counter",
      JSON.stringify({
        wins: winsCounter.innerHTML,
        draws: drawsCounter.innerHTML,
        loses: losesCounter.innerHTML,
      })
    );
    handleGame(playerImg, randomImg[randomNum]);
    tableContainer.insertAdjacentHTML("beforeend", html);
  }
});
window.addEventListener("load", init);
resetScore.addEventListener("click", () => {
  document.querySelector("thead").classList.add("hidden");
  localStorage.removeItem("history");
  tableContainer.innerHTML = "";
  winsCounter.innerHTML = "0";
  drawsCounter.innerHTML = "0";
  losesCounter.innerHTML = "0";
  myChoice.src = `images/choose.png`;
  computerChoice.src = `images/random.png`;
});
