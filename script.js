const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

//Calculate first and second value
const calculate={
    '÷':(firstNumber,secondNumber)=>firstNumber/secondNumber,
    '×':(firstNumber,secondNumber)=>firstNumber*secondNumber,
    '+':(firstNumber,secondNumber)=>firstNumber+secondNumber,
    '-':(firstNumber,secondNumber)=>firstNumber-secondNumber,
    '=':(firstNumber,secondNumber)=>secondNumber
};

let firstValue = 0;
let operatorValue = '';
let nextValue = false;

// Send Number Value
function sendNumberValue(number) {
    //Replace current display value if fist value is entered
    if (nextValue == true) {
        calculatorDisplay.textContent = number;
        nextValue = false;
    }
    else {
        // If current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        if (displayValue === '0') {
            calculatorDisplay.textContent = number;
        }
        else {
            calculatorDisplay.textContent = displayValue + number;
        }
    }
}

// Add Decimal
function addDecimal() {
    // if operator pressed, don't add decimal
    if(nextValue==true) return;
    // if no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent += ".";
    }
}

//Use Operator
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    //Prevent multiple operators
    if(nextValue==true) {
        operatorValue=operator;
        return;
    }
    //Assign first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    }
    else {
        const calculation=calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent=calculation;
        firstValue=calculation;
    }
    // Next value
    nextValue = true;
    operatorValue = operator;
}


// Reset all values, Display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    nextValue = false;
    calculatorDisplay.textContent = '0';
}

// Add Event Listener for numbers, operators, decimal button
inputButtons.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        //this is number, because they dont have class
        //all of our number have value
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    }
    else if (inputBtn.classList.contains('operator')) {
        //any buttons with the operator class
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    }
    else if (inputBtn.classList.contains('decimal')) {
        //any buttons with the decimal class
        inputBtn.addEventListener('click', () => addDecimal())
    }
});


// Event Listener
clearButton.addEventListener('click', () => resetAll());