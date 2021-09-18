const phrases = [
	"May the Force be with you",
	"To infinity and beyond",
	"I am the one who knocks",
	"I demand a trial by combat",
	"We are Groot",
	"This world shall know pain",
	"Beam me up Scotty",
	"You Shall Not Pass",
];

const usedPhrase = [];

let playerScore = 0;
let wrongGuesses = 0;
const overlay = document.getElementById("overlay");
const keyboard = document.getElementById("qwerty");
const buttons = document.getElementsByTagName("button");
const score = document.getElementsByClassName("score")[0];
const playBtn = document.getElementsByClassName("btn__reset")[0];
const phraseContainer = document.getElementById("phrase").firstElementChild;
const scoreboard = document.getElementById("scoreboard").firstElementChild;

// This function starts the game
function startGame() {
	overlay.style.display = "none";
	const phrase = phraseRandomizer().toUpperCase();
	addPhraseToDisplay(phrase);
}

// This function reverts all the changes made during a round
function newGame() {
	phraseContainer.innerHTML = "";
	wrongGuesses = 0;
	const liList = scoreboard.querySelectorAll("li");
	for (let li of liList) {
		const img = li.firstElementChild;
		img.src = "images/liveHeart.png";
	}
	for (let button of buttons) {
		button.removeAttribute("disabled");
		button.classList.remove("chosen");
	}
	startGame();
}

// This function returns a rendom phrase from the phrases array
function phraseRandomizer() {
	const index = Math.floor(Math.random() * (phrases.length - 1 - 0 + 1)) + 0;
	const phrase = phrases[index];
	phrases.splice(index, 1);
	usedPhrase.push(phrase);
	return phrase;
}

// This function appends phrase to the display
function addPhraseToDisplay(phrase) {
	const phraseArr = Array.from(phrase);
	for (let char of phraseArr) {
		const item = createLi(char);
		phraseContainer.append(item);
	}
	return;
}

// This function creates li elements and returns it
function createLi(char) {
	if (char === " ") {
		return createElement("li", "classList", "space");
	} else {
		const li = createElement("li", "classList", "letter");
		span = createElement("span", "textContent", char);
		li.append(span);
		return li;
	}
}

// This function creates elements based on the parameters supplied
function createElement(element, property, value) {
	const item = document.createElement(element);
	item[property] = value;
	return item;
}

// This function validates the pressed buttons
function validatePressedBtn(pressedChar) {
	const listOfLi = phraseContainer.children;
	let charsCorrect = 0;
	for (let li of listOfLi) {
		if (li.classList[0] !== "space") {
			char = li.firstElementChild.textContent;
			if (char && pressedChar === char) {
				li.classList.add("show");
				charsCorrect++;
			}
		}
	}
	if (!charsCorrect) removeLife();
	checkForWin();
}

// This function removes a heart when a wrong button is pressed
function removeLife() {
	const li = scoreboard.querySelectorAll("li")[wrongGuesses];
	const img = li.firstElementChild;
	if ((img.src = "images/liveHeart.png")) {
		img.src = "images/lostHeart.png";
		wrongGuesses++;
	}
	if (wrongGuesses === 5) gameOver();
	return;
}

// This function checks if the player has guessed the phrase correctly
function checkForWin() {
	const numberOfLi = phraseContainer.querySelectorAll(".letter").length;
	const numberOfLiShow = document.querySelectorAll(".show").length;
	if (numberOfLi === numberOfLiShow)
		setTimeout(() => {
			gameWon();
		}, 500);
	else return;
}

// This function displays the 'win' overlay
function gameWon() {
	const h2 = overlay.firstElementChild;
	const a = overlay.lastElementChild;
	overlay.className = "win";
	overlay.style.display = "";
	h2.textContent = "You won";
	a.textContent = "Play Again";
	a.id = "";
	updatePlayerScore("add");
	return;
}

// This function displays the 'lose overlay'
function gameOver() {
	const h2 = overlay.firstElementChild;
	const a = overlay.lastElementChild;
	overlay.className = "lose";
	overlay.style.display = "";
	h2.textContent = "You lose";
	a.textContent = "Retry";
	a.id = "";
	updatePlayerScore("reset");
	return;
}

// This function updates the score counter
function updatePlayerScore(type) {
	playerScore = playerScoreCalculator(type);
	score.textContent = playerScore;
}

// This function calculates the current score
function playerScoreCalculator(type) {
	if (type === "add") return playerScore + 1;
	else return 0;
}

// Listens for click events on the overlay anchor tags (buttons)
playBtn.addEventListener("click", (event) => {
	const btn = event.target;
	const action = btn.textContent;
	if (action === "Start Game") {
		startGame();
	}
	if (action === "Play Again" || action === "Retry") {
		newGame();
	}
});

// Listens for click events on the qwerty container (keyboard)
keyboard.addEventListener("click", (event) => {
	const pressedBtn = event.target;
	if (pressedBtn.tagName === "BUTTON") {
		const pressedChar = pressedBtn.textContent;
		pressedBtn.disabled = true;
		pressedBtn.classList.add("chosen");
		validatePressedBtn(pressedChar.toUpperCase());
	}
});

// Listens for keydown events on the page
document.addEventListener("keydown", (event) => {
	const pressedChar = event.key;
	loop: for (let i = 0; i < buttons.length; i++) {
		const pressedBtn = buttons[i];
		const isNotDisabled = !pressedBtn.disabled;
		const char = pressedBtn.textContent;
		if (pressedChar === char && isNotDisabled) {
			pressedBtn.disabled = true;
			pressedBtn.classList.add("chosen");
			validatePressedBtn(pressedChar.toUpperCase());
			break loop;
		}
	}
});
