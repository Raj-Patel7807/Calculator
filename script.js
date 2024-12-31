let runningTotal = 0;
let buffer = "0";
let operator;

const mainScreen = document.querySelector(".screen #main-screen");
const operatorScreen = document.querySelector(".screen #op-screen");
const btns = document.querySelectorAll("button");

const mathOperation = (intBuffer) => {
    if(operator === '+') {
        runningTotal += intBuffer;
    } else if(operator === '-') {
        runningTotal -= intBuffer;
    } else if(operator === '*') {
        runningTotal *= intBuffer;
    } else if(operator === '/') {
        runningTotal /= intBuffer;
    }
};

const handleMath = (symbol) => {
    if(buffer === "0") {
        return;
    }

    const intBuffer = parseFloat(buffer);

    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        mathOperation(intBuffer);
    }

    operator = symbol;
    operatorScreen.innerText = symbol;
    buffer = "0";
};

const handleSymboles = (symbol) => {
    if(symbol === 'C') {
        buffer = "0";
        runningTotal = 0;
        operatorScreen.innerText = "";
    } else if(symbol === '=') {
        if(operator === null) {
            return;
        }
        mathOperation(parseFloat(buffer));
        buffer = runningTotal.toString();
        runningTotal = 0;
        operator = null;
        operatorScreen.innerText = "";
    } else if(symbol === 'larr') {
        if(buffer.length === 1) {
            buffer = "0";
        } else {
            buffer = buffer.slice(0, -1);
        }
    } else if(symbol === 'pm') {
        buffer = (parseFloat(buffer) * (-1)).toString();
    } else {
        handleMath(symbol);
    }
};

const handleNumbers = (numStr) => {
    if(numStr === '.') {
        if(!buffer.includes('.')) {
            buffer += '.';
        }
    } else if(buffer === "0") {
        buffer = numStr;
    } else {
        buffer += numStr;
    }
};

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        let val = btn.getAttribute("id");

        if(isNaN(val) && val !== '.') {
            handleSymboles(val);
        } else {
            handleNumbers(val);
        }

        mainScreen.innerText = buffer;  
    });
});
