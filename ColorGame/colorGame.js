var numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay")
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var numInput = document.querySelector("input[type='number']");

init();

function init() {
	// mode buttons event listeners
	setupModeButtons();
	// set up squares listener
	setupSquares();

	reset();
}

function setupModeButtons() {

	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected")

			// this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;
		if (this.textContent === "Easy"){
			numInput.style.display = "none";
			numOfSquares = 3;
		} else if (this.textContent === "Hard"){
			numInput.style.display = "none";
			numOfSquares = 6;
		} else {
			setUpCustom();
		}

		reset();
		})
	}
}

function setUpCustom() {
	numInput.value = 6;
	numInput.style.display = "inline-block";
	numInput.addEventListener("click", function(){

		var userValue = Number(numInput.value);
		if (userValue >= 6) {
			numOfSquares = userValue;
			reset();
		} else if (userValue < 6) {
			numInput.value = 6;
			numOfSquares = 6;
			messageDisplay.textContent = "No. of blocks must be > 6!"
		}
		
		squares = document.querySelectorAll(".square");
		
	})

	addDiv(numOfSquares);

	setupSquares();
}

function addDiv(num) {
		for (var i = 0; i < num; i++) {
			var innerDiv = document.createElement('div');
			innerDiv.className = 'square';
			var container = document.getElementById("container");
			container.appendChild(innerDiv);
		}

		squares = document.querySelectorAll(".square");

}

function setupSquares() {

	for (var i = 0; i < squares.length; i++) {
		// adding click listener to squares
		squares[i].addEventListener("click", function(){
			// gets color of picked square
			var clickedColor = this.style.backgroundColor;
			// compares color to pickedColor 
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again"
			}

		});
	}
}

function reset() {
	// generate new colors
	colors = generateRandomColors(numOfSquares);
	// pick new color from array
	pickedColor = pickColor();
	// change color display to match picked color
	colorDisplay.textContent = pickedColor;

	// reflect new colors
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		
	}
	// always set back to "New Color" instead of "Play Again?"
	resetButton.textContent = "New Colors";
	// always set background color back to original
	h1.style.backgroundColor = "steelblue";
	// remove span text
	messageDisplay.textContent = "";
}


resetButton.addEventListener("click", function(){
	reset();
})

function changeColors(color) {
	// loop through all squares and change each color to match pickedColor
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	// make an array
	var arr = [];
	// add num random colors to the array
	for (var i = 0; i < num; i++) {
		// get random color and push it to arr
		arr.push(randomColor());
	}
	// and then return that array
	return arr;
}

function randomColor() {
	// to get random color, we need to pick a "red" between 0 and 255
	// a "green" between 0 and 255
	// a "blue" between 0 and 255

	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	// format to RGB
	var resultedColor = "rgb(" + r + ", " + g + ", " + b + ")";

	return resultedColor;

}