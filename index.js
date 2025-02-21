let currentInput = '';
let operator = '';
let previousInput = '';

const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.button'));
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');

buttons.map(button => {
    button.addEventListener('click', function() {
        if (this.innerText === 'C') {
            clearCalculator();
        } else if (this.innerText === '=') {
            calculate();
        } else {
            appendToInput(this.innerText);
        }
    });
});

function appendToInput(value) {
    if (!isNaN(value) || value === '.') {
        currentInput += value;
        updateDisplay(currentInput);
    } else {
        handleOperator(value);
    }
}

function handleOperator(value) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentInput = computation;
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    display.innerText = value.length > 10 ? value.substring(0, 10) : value;
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}
