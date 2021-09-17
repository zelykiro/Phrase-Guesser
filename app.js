const phrases = ["Muhammed", "Rasil", "Keethadath", "man a drag", "joe mama"];

const overlay = document.getElementById("overlay");
const playBtn = document.getElementsByClassName("btn__reset")[0];
const phraseContainer = document.getElementById("phrase").firstElementChild;
const keyboard = document.getElementById("qwerty");
const scoreboard = document.getElementById("scoreboard").firstElementChild;
let wrongGuesses = 0;

function gameStart() {
	overlay.style.display = "none";
	const phrase = phraseRandomizer().toUpperCase();
	phraseCharContainerCreator(phrase);
}

function nextRound() {
	phraseContainer.innerHTML = "";
	wrongGuesses = 0;
	const liList = scoreboard.querySelectorAll("li");
	for (let li of liList) {
		const img = li.firstElementChild;
		img.src = "images/liveHeart.png";
	}
	const buttonList = document.querySelectorAll("button");
	for (let button of buttonList) {
		button.removeAttribute("disabled");
		button.classList.remove("chosen");
	}
	gameStart();
}

function phraseRandomizer() {
	const index = Math.floor(Math.random() * (phrases.length - 1 - 0 + 1)) + 0;
	return phrases[index];
}

function phraseCharContainerCreator(phrase) {
	const phraseArr = Array.from(phrase);
	for (let char of phraseArr) {
		const item = createLi(char);
		phraseContainer.append(item);
	}
	return;
}

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

function createElement(element, property, value) {
	const item = document.createElement(element);
	item[property] = value;
	return item;
}

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
	if (!charsCorrect) removeHeart();
	checkIfGuessedCorrectly();
}

function removeHeart() {
	const li = scoreboard.querySelectorAll("li")[wrongGuesses];
	const img = li.firstElementChild;
	if ((img.src = "images/liveHeart.png")) {
		img.src = "images/lostHeart.png";
		wrongGuesses++;
	}
	if (wrongGuesses === 5) gameOver();
	return;
}

function checkIfGuessedCorrectly() {
	const numberOfLi = phraseContainer.querySelectorAll(".letter").length;
	const numberOfLiShow = document.querySelectorAll(".show").length;
	if (numberOfLi === numberOfLiShow) gameWon();
	else return;
}

function gameWon() {
	const h2 = overlay.firstElementChild;
	const a = overlay.lastElementChild;
	overlay.className = "win";
	overlay.style.display = "";
	h2.textContent = "You won";
	a.textContent = "Play Again";
	a.id = "";
	return;
}

function gameOver() {
	const h2 = overlay.firstElementChild;
	const a = overlay.lastElementChild;
	overlay.className = "lose";
	overlay.style.display = "";
	h2.textContent = "You lose";
	a.textContent = "Retry";
	a.id = "";
	return;
}

playBtn.addEventListener("click", (event) => {
	const btn = event.target;
	const action = btn.textContent;
	if (action === "Start Game") {
		gameStart();
	}
	if (action === "Play Again" || action === "Retry") {
		nextRound();
	}
});

keyboard.addEventListener("click", (event) => {
	const pressedBtn = event.target;
	if (pressedBtn.tagName === "BUTTON") {
		const pressedChar = pressedBtn.textContent;
		pressedBtn.disabled = true;
		pressedBtn.classList.add("chosen");
		validatePressedBtn(pressedChar.toUpperCase());
	}
});
