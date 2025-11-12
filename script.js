const operationDiv = document.getElementById('operation');
const resultDiv = document.getElementById('result');

const numberButtons = document.querySelectorAll('.btn.number');
const operatorButtons = document.querySelectorAll('.btn.operator');
const equalsButton = document.querySelector('.btn.equals');
const clearButton = document.querySelector('.btn.clear');

let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let isSecondNumber = false;

function ajustarFuente() {
    const maxWidth = resultDiv.parentElement.offsetWidth - 20;
    let fontSize = 1.8;
    resultDiv.style.fontSize = `${fontSize}rem`;
    while (resultDiv.scrollWidth > maxWidth && fontSize > 0.5) {
        fontSize -= 0.05;
        resultDiv.style.fontSize = `${fontSize}rem`;
    }
}

function actualizarPantalla() {
    if (!isSecondNumber) {
        operationDiv.textContent = firstNumber || '0';
        resultDiv.textContent = firstNumber || '0';
    } else {
        operationDiv.textContent = `${firstNumber} ${currentOperator}`;
        resultDiv.textContent = secondNumber || '0';
    }
    ajustarFuente();
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent;
        if (!isSecondNumber) {
            firstNumber += number;
        } else {
            secondNumber += number;
        }
        actualizarPantalla();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!firstNumber) return;
        if (isSecondNumber && secondNumber) {
            calcularResultado();
        }
        currentOperator = button.textContent;
        isSecondNumber = true;
        actualizarPantalla();
    });
});

function calcularResultado() {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let result;

    switch (currentOperator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Error';
            break;
        default:
            return;
    }

    operationDiv.textContent = `${firstNumber} ${currentOperator} ${secondNumber}`;
    firstNumber = result.toString();
    secondNumber = '';
    currentOperator = '';
    isSecondNumber = false;
    resultDiv.textContent = firstNumber;
    ajustarFuente();
}

equalsButton.addEventListener('click', () => {
    if (firstNumber && currentOperator && secondNumber) {
        calcularResultado();
    }
});

clearButton.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
    isSecondNumber = false;
    operationDiv.textContent = '0';
    resultDiv.textContent = '0';
    resultDiv.style.fontSize = '1.8rem';
});