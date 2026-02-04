const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

const operators = ["+", "-", "*", "/"];

function handleInput(value) {

  // CLEAR
  if (value === "C") {
    display.value = "";
    return;
  }

  // EQUAL
  if (value === "=") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
    return;
  }

  // PERCENT
  if (value === "%") {
    if (display.value) {
      display.value = Number(display.value) / 100;
    }
    return;
  }

  // PLUS / MINUS  ✅ ADDED
  if (value === "+/-") {
    if (display.value) {
      display.value = display.value.startsWith("-")
        ? display.value.slice(1)
        : "-" + display.value;
    }
    return;
  }

  // DOT
  if (value === ".") {
    let parts = display.value.split(/[\+\-\*\/]/);
    let lastNumber = parts[parts.length - 1];
    if (!lastNumber.includes(".")) {
      display.value += ".";
    }
    return;
  }

  // OPERATORS
  if (operators.includes(value)) {
    let lastChar = display.value.slice(-1);
    if (display.value !== "" && !operators.includes(lastChar)) {
      display.value += value;
    }
    return;
  }

  // NUMBERS
  display.value += value;
}

// BUTTON CLICK
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleInput(btn.innerText.trim());
  });
});

// KEYBOARD
document.addEventListener("keydown", (e) => {

  if (!isNaN(e.key)) {
    handleInput(e.key);
  }

  if (operators.includes(e.key)) {
    handleInput(e.key);
  }

  if (e.key === "Enter") {
    handleInput("=");
  }

  if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  if (e.key === ".") {
    handleInput(".");
  }

  // SIGN TOGGLE (press N) ✅ ADDED
  if (e.key === "n") {
    handleInput("+/-");
  }
});
