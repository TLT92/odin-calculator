let firstNumber = "";
let operator = "";
let secondNumber = "";
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


function extractNumbers() {
  // Split string input to extract numbers & store them as numbers.
  let display = document.querySelector("#display");
  displayText = display.textContent
  let splitString = displayText.split(/[-+*/]/);

  splitString[0] = Number(splitString[0]);
  splitString[1] = Number(splitString[1]);

  return splitString
}

// Function to show user input on "display" of calculator.
function populateDisplay(userInput) {
  let display = document.querySelector("#display");
  if (userInput === "←" || userInput === "Backspace") {
    display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    return;
  }

  if (userInput === ".") {
    // Split string input to extract numbers & store them as numbers.
    displayText = display.textContent

    if (displayText.includes("+") || displayText.includes("-") || displayText.includes("*") || displayText.includes("/")) {
      let numbers = extractNumbers();
      let currentNumber = numbers[1];
      if (currentNumber.includes(".")) {
        return;
      }
    } else {
      if (displayText.includes(".")) {
        return
      }
    }
  }

  display.textContent = display.textContent + userInput;

  if (operator === "") {
    // If input is operator, store that operator in variable.
    if (userInput === "+" || userInput === "-" || userInput === "*" || userInput === "/") {
      operator = userInput;
    }
  } else if (userInput === "+" || userInput === "-" || userInput === "*" || userInput === "/") {
    if (display.textContent[display.textContent.length - 2] === "+" || display.textContent[display.textContent.length - 2] === "-" || display.textContent[display.textContent.length - 2] === "*" || display.textContent[display.textContent.length - 2] === "/") {
      display.textContent = display.textContent.slice(0, display.textContent.length - 2);
      display.textContent = display.textContent + userInput;
    } else {
      display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    }
  }
}

function transformInput() {
  debugger
  // Split string input to extract numbers & store them as numbers.
  let display = document.querySelector("#display");
  displayText = display.textContent
  let splitString = displayText.split(/[-+*/]/);
  debugger
  firstNumber = Number(splitString[0]);
  secondNumber = Number(splitString[1]);

  debugger
  if (operator === "/" && secondNumber === 0) {
    clearDisplay();
    display.textContent = "ERROR, DIVIDING BY 0 IS NOT ALLOWED!";
  } else {
    if (splitString[1] !== undefined) {
      // Calculate result, display it & reset everything.
      operate(operator, firstNumber, secondNumber);
      clearDisplay();
  
      // If result has too many decimals for display, round down.
      let stringResult = result.toString();
      if (stringResult.includes(".")) {
        let splitString = stringResult.split(".");
        let decimals = splitString[1];
        if (decimals.length > 6) {
          result = Math.round((a + Number.EPSILON)*1000000)/1000000;
          result = Number(result);
        }
      }
    populateDisplay(result);
    }
  }
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

// Add key "support" to all buttons whose press are there to populate display.
let displayButtons = document.querySelectorAll(".display-button");
displayButtons.forEach(displayButton => {
  displayButton.addEventListener("keydown", (event) => {
    debugger
    if (event.key === displayButton.textContent) {
      populateDisplay(displayButton.textContent);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    return;
  }
  
  let pressedKey = Number(event.key);
  // Check if pressed key is not a number (a regular comparison like so "xyz !== NaN" does not work since any comparison with NaN returns false)
  if (!isNaN(pressedKey) || event.key === "." || event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/" || event.key === "Backspace") {
    populateDisplay(event.key);
  }

  if (event.key === "Enter") {
    transformInput();
  }
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

/* CLEARER? syntax of adding event listeners.
// Iterate over each number button using forEach
numberButtons.forEach(function(numberButton) { 
  // Add a click event listener to each number button
  numberButton.addEventListener("click", function(event) {
    // Call the populateDisplay function with the text content of the clicked button
    const buttonText = event.target.textContent; // Get the text content of the clicked button
    populateDisplay(buttonText); // Populate the display with the button text
  });
});


NEXT TO DOS:
Add keyboard support!
*/