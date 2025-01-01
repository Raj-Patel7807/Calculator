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
    } else if(symbol === '%') {
        if(operator && buffer !== '0') {
            buffer = (runningTotal * (parseFloat(buffer) / 100)).toString();
        }
    } else {
        handleMath(symbol);
    }
};

const handleNumbers = (numStr) => {
    if(buffer === "0" && numStr !== '.') {
        buffer = numStr;
    } else if(buffer.length < 12) {
        if(numStr === '.') {
            if(!buffer.includes('.')) {
                buffer += '.';
            }
        } else {
            buffer += numStr;
        }
    }
};

const highlightButton = (key) => {
    const btn = document.querySelector(`button[id="${key}"]`);

    if(btn) {
        btn.classList.add("active");
    }
};

const dehighlightButton = (key) => {
    const btn = document.querySelector(`button[id="${key}"]`);

    if(btn) {
        btn.classList.remove("active");
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

    btn.addEventListener("mousedown", () => {
        btn.classList.add("active");
    });

    btn.addEventListener("mouseup", () => {
        btn.classList.remove("active");
    });

    btn.addEventListener("mouseout", () => {
        btn.classList.remove("active");
    });
});

document.addEventListener("keydown", (event) => {
    const key = event.key;

    event.preventDefault();

    if(!isNaN(key) || key === '.') {
        handleNumbers(key);
    } else if(['+', '*', '/'].includes(key)) {
        handleMath(key);
    } else if(key === '-') {
        if(buffer === '0') {
            handleSymboles('pm');
        } else {
            handleMath(key);
        }
    } else if(key == '%') {
        handleSymboles('%');
    } else if(key === "Enter" || key === '=') {
        handleSymboles('=');
    } else if(key === "Backspace") {
        handleSymboles("larr");
    } else if(key === 'c' || key === 'C') {
        handleSymboles('C');
    }

    mainScreen.innerText = buffer;
    operatorScreen.innerText = operator || "";
});

document.addEventListener("keydown", (event) => {
    let key = event.key;

    if(key === "Enter") {
        key = '=';
    } else if(key === "Backspace") {
        key = "larr";
    } else if(key === 'c') {
        key = 'C';
    }

    highlightButton(key);
});

document.addEventListener("keyup", (event) => {
    let key = event.key;

    if(key === "Enter") {
        key = '=';
    } else if(key === "Backspace") {
        key = "larr";
    } else if(key === 'c') {
        key = 'C';
    }

    dehighlightButton(key);
});
