let display = document.querySelector("#display");
let button = document.querySelectorAll("button");
const operators = ["+", "-", "*", "/" ,"1","2","3","4","5","6","7","9","0"];

button.forEach((btn) => {

  btn.addEventListener("click", () => {
    let value = btn.innerText.trim();

    if (value === "C") {
      display.value = "";
    } 
    else if (value === "=") {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
    } 
    else if (value === ".") {
      if (!display.value.includes(".")) {
        display.value += ".";
      }
    } 
    else if (value === "+/-") {
      if (display.value) {
        display.value = display.value.startsWith("-")
          ? display.value.slice(1)
          : "-" + display.value;
      }
    } 
    else if (value === "%") {
      let sec = display.value;
       
         
        if (sec.includes("%")) {
          let parts = sec.split("%");
        if (parts.length === 2 && parts[0] !=="" && parts[1] !== "") {
          let total = Number(parts[0]);
          let part = Number(parts[1]);
        if (total !== 0 ) {
          let result = (part/total)*100
          display.value = result
        }else{
          display.value = "error"
        }
      }
      
        
      }
    }
       else if (operators.includes(value)) {
        let lastChar = display.value.slice(-1);
        if (!operators.includes(lastChar)) {
          display.value += value;
        } 
        } 
        else {
          display.value += value;
        }
      
    
  });
});
document.addEventListener("keydown", (e) => {
 
  if (!isNaN(e.key)) {
    display.value += e.key;
    return;
  }

 
  if (operators.includes(e.key)) {
    let lastChar = display.value.slice(-1);
    if (!operators.includes(lastChar)) {
      display.value += e.key;
    }
    return;
  }

 
  if (e.key === "Enter") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
    return;
  }


  if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
    return;
  }


  if (e.key === ".") {
    if (!display.value.includes(".")) {
      display.value += ".";
    }
  }
});
