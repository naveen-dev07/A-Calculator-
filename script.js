const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

const operators = ["+", "-", "*", "/"];

// 🔹 Main handler (button + keyboard dono yahin se)
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

  // PERCENT (50 → 0.5)
  if (value === "%") {
    if (display.value) {
      display.value = Number(display.value) / 100;
    }
    return;
  }

  // DOT (last number check)
  if (value === ".") {
    let parts = display.value.split(/[\+\-\*\/]/);
    let lastNumber = parts[parts.length - 1];
    if (!lastNumber.includes(".")) {
      display.value += ".";
    }
    return;
  }

  // OPERATOR (no double operator)
  if (operators.includes(value)) {
    let lastChar = display.value.slice(-1);
    if (display.value !== "" && !operators.includes(lastChar)) {
      display.value += value;
    }
    return;
  }

  // NUMBER
  display.value += value;
}

// 🔹 Button click
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleInput(btn.innerText.trim());
  });
});

// 🔹 Keyboard support
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
});
