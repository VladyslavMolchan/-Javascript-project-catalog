document.addEventListener("DOMContentLoaded", () => {
  let displayValue = "0";
  let hasDecimal = false;
  const display = document.getElementById("display");
  const numButtons = document.querySelectorAll(".num-button");
  const operatorButtons = document.querySelectorAll(".operator-button");
  const clearButton = document.querySelector(".clear-button");
  const calculateButton = document.querySelector(".calculate-button");
  const percentageButton = document.querySelector(".percentage-button");
  const decimalButton = document.querySelector(".decimal-button");
  const deleteButton = document.querySelector(".delete-button");

  display.value = displayValue;

  numButtons.forEach((button) => {
    button.addEventListener("click", () => {
      appendToDisplay(button.dataset.value);
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      appendToDisplay(button.dataset.value);
    });
  });

  clearButton.addEventListener("click", () => {
    clearDisplay();
  });

  calculateButton.addEventListener("click", () => {
    calculate();
  });

  percentageButton.addEventListener("click", () => {
    calculatePercentage();
  });

  decimalButton.addEventListener("click", () => {
    appendDecimal();
  });

  deleteButton.addEventListener("click", () => {
    deleteLastCharacter();
  });

  function appendToDisplay(value) {
    if (value === ".") {
      if (!hasDecimal && displayValue.indexOf(".") === -1) {
        hasDecimal = true;
        displayValue += value;
      }
    } else if (value === "←") {
      deleteLastCharacter();
    } else if (displayValue === "0") {
      displayValue = value;
    } else {
      displayValue += value;
    }
    display.value = displayValue;
  }

  function clearDisplay() {
    displayValue = "0";
    hasDecimal = false;
    display.value = displayValue;
  }

  function calculate() {
    try {
      const result = eval(displayValue);
      displayValue = result.toString();
      display.value = displayValue;
    } catch (error) {
      displayValue = "Error";
      display.value = displayValue;
    }
  }

  function calculatePercentage() {
    try {
      const result = eval(displayValue) / 100;
      displayValue = result.toString();
      display.value = displayValue;
    } catch (error) {
      displayValue = "Error";
      display.value = displayValue;
    }
  }

  function appendDecimal() {
    if (!hasDecimal && displayValue.indexOf(".") === -1) {
      hasDecimal = true;
      displayValue += ".";
      display.value = displayValue;
    }
  }

  function deleteLastCharacter() {
    if (displayValue.length > 1) {
      displayValue = displayValue.slice(0, -1);
      display.value = displayValue;
    } else {
      displayValue = "0";
      display.value = displayValue;
    }
  }
});
