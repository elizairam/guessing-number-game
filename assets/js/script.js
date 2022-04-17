const body = document.getElementsByTagName("body")[0];
const footer = document.getElementsByTagName("footer")[0];
const theme_selector = document.getElementById("theme-selector");
      theme_selector.addEventListener("click", ChangeTheme);
const h2 = document.getElementsByTagName("h2");
const h1 = document.getElementsByTagName("h1")[0];
const subtitle = document.getElementsByClassName("subtitle")[0];

const button = document.getElementById("guess-enter");
      button.addEventListener("click", CheckGuess);
const h2_result = document.getElementById("result");
const h2_remaining = document.getElementById("remaining");
const h2_result_max = document.getElementById("result-max");
const progress_bar = document.getElementById("progress-bar");

const guess = {
  total: 0,
  number: 0,
  max: 10,
};

const game = {
  chosed_number_random: Math.floor(Math.random() * 101),
  status: "started",
  message: "",
};

function CheckGuess() {
  guess.number = document.getElementById("guess-number").value;
  if (game.chosed_number_random == guess.number) {
    h2_result.innerHTML = "You got it✨";
    game.status = "finished";
    Reset();
  } else if (game.chosed_number_random < guess.number) {
    CounterGuess();
    CounterMaxGuess();
    h2_result.innerHTML = "That's too high ";
  } else if (game.chosed_number_random > guess.number) {
    CounterGuess();
    CounterMaxGuess();
    h2_result.innerHTML = "That's too low ";
  } else {
    h2_result.innerHTML = "Please, enter a number between 0 and 100 ";
  }
}

function CounterGuess() {
  guess.total >= 10
    ? Reset()
    : (guess.total += 1) && (h2_result_max.innerHTML = "Guess: " + guess.total);
}

function CounterMaxGuess() {
  guess.max >= 0
    ? (guess.max -= 1) &&
      (h2_remaining.innerHTML = "Remaining: " + guess.max) &&
      (progress_bar.value = guess.max)
    : GameOver();
}

function GameOver() {
  game.status = "finished";
  ShowMessage();
}

function ShowMessage() {
  game.message = "Better luck next time 🍀";
  h2_remaining.innerHTML = game.message;
}

function Reset() {
  if (game.status === "finished") {
    document.getElementById("guess-number").value = null;
    game.status = "started";
    game.message = "";
    game.chosed_number_random = Math.floor(Math.random() * 101);
    guess.total = 1;
    h2_result_max.innerHTML = "enter your guess and press enter to start again";
    guess.max = 10;
    h2_remaining.innerHTML = null;
    progress_bar.value = 10;
  }
}

function ChangeTheme() {
  body.classList.toggle("dark-theme");
  footer.classList.toggle("dark-theme");
  for (let i = 0; i < h2.length; i++) {
    h2[i].classList.toggle("dark-theme");
  }
  h1.classList.toggle("dark-theme");
  subtitle.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    theme_selector.innerHTML = "🌞";
    return;
  }
  theme_selector.innerHTML = "🌜";
}
