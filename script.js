let firstNumber;
let operator;
let secondNumber;
let result;

function operate(operator, firstNumber, secondNumber) {
  if(operator === "+") {
    result = add(firstNumber, secondNumber);
  } else if(operator === "-") {
    result = subtract(firstNumber, secondNumber);
  } else if(operator === "*") {
    result = multiply(firstNumber, secondNumber);
  } else if(operator === "/") {
    result = divide(firstNumber, secondNumber);
  }
}

function add(summand1, summand2) {
  let sum = summand1 + summand2;

  return sum;
}

function subtract(minuend, subtrahend) {
  let difference = minuend - subtrahend;

  return difference;
}

function multiply(multiplicand, multiplier) {
  let product = multiplicand * multiplier;

  return product;
}

function divide(dividend, divisor) {
  let quotient = dividend / divisor;

  return quotient;
}

/*
Create the functions that populate the display when you click the digit buttons. 
You should store the content of the display (the number) in a variable for use in the next step.
*/

// Function to show user input on "display" of calculator.
function populateDisplay(userInput) {
  let display = document.querySelector("#display");
  display.textContent = display.textContent + userInput;

  // If input is operator, store that operator in variable.
  if(userInput === "+" || userInput === "-" || userInput === "*" || userInput === "/") {
    operator = userInput;
  }
}

function transformInput() {
  // Split string input to extract numbers & store them as numbers.
  let display = document.querySelector("#display");
  displayText = display.textContent
  let splitString = displayText.split(/[-+*]/);
  debugger
  firstNumber = Number(splitString[0]);
  secondNumber = Number(splitString[1]);

  // Calculate result, display it & reset everything.
  operate(operator, firstNumber, secondNumber);
  clearDisplay();
  populateDisplay(result);
}

function clearDisplay() {
  let display = document.querySelector("#display");
  display.textContent = "";
  firstNumber = "";
  secondNumber = "";
  operator = "";
}

// Add event listeners to all number buttons.
let numberButtons = document.querySelectorAll(".number-button");
numberButtons.forEach(numberButton => {
  numberButton.addEventListener("click", (event) => {
    populateDisplay(event.target.textContent);
  });
});

// Add event listeners to all operation buttons.
let operationButtons = document.querySelectorAll(".operation-button");
operationButtons.forEach(operationButton => {
  operationButton.addEventListener("click", (event) => {
    populateDisplay(event.target.textContent);
  });
});

let clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearDisplay);

let calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", transformInput);

/*
// Iterate over each number button using forEach
numberButtons.forEach(function(numberButton) { 
  // Add a click event listener to each number button
  numberButton.addEventListener("click", function(event) {
    // Call the populateDisplay function with the text content of the clicked button
    const buttonText = event.target.textContent; // Get the text content of the clicked button
    populateDisplay(buttonText); // Populate the display with the button text
  });
});
*/