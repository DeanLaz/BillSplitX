// SELECTORS

// PEOPLE SELECTORS

const OPTION2 = document.getElementById("2-option");
const OPTION3 = document.getElementById("3-option");
const OPTION4 = document.getElementById("4-option");
const OPTION5 = document.getElementById("5-option");
const OPTION6 = document.getElementById("6-option");
const OPTION_CUSTOM = document.getElementById("input-option");
const INPUT_CUSTOM = document.getElementById("input-people-value-field");
const PEOPLE_OPT_RADIO = document.querySelectorAll(".people-selector-option");

// BILL SELECTORS

const INPUT_TOTAL = document.getElementById("input-bill-value-field");

// TIP SELECTORS
const TIP_OPTION_NONE = document.getElementById("no-tip-option");
const TIP_OPTION5 = document.getElementById("5%-option");
const TIP_OPTION10 = document.getElementById("10%-option");
const TIP_OPTION15 = document.getElementById("15%-option");
const TIP_OPTION20 = document.getElementById("20%-option");
const TIP_OPTION25 = document.getElementById("25%-option");
const TIP_OPTION30 = document.getElementById("30%-option");
const TIP_OPTION_CUSTOM = document.getElementById("custom-tip-option");
const TIP_OPTION_TYPE = document.getElementById("custom-tip-option-type");
const TIP_CUSTOM_INPUT = document.getElementById("input-tip-value-field");
const TIP_OPT_DIV = document.querySelectorAll(".tip-selector-option");
const TIP_OPT_RADIO = document.querySelectorAll(".tip-selector");

// CALCULATE SELECTOR

const CALC_BTN = document.getElementById("calculate-btn");

// RESET SELECTOR

const RESET_BTN = document.getElementById("reset-btn");

// OUTPUT SELECTOR

const OUTPUT = document.getElementById("output");

// GLOBALS

let peopleValue = "";
let billValue = "";
let tipPercentValue = "";
let tipCashValue = "";
let outCome = "";
let result = "";
let totalPlusTip = "";

// FUNCTIONS
const handleBill = () => {
  if (INPUT_TOTAL.value === "") {
    INPUT_TOTAL.value = "Enter Bill Amount";
  } else {
    billValue = INPUT_TOTAL.value;
  }
};

PEOPLE_OPT_RADIO.forEach((option) => {
  option.addEventListener("click", (event) => {
    if (event.target.value) {
      if (event.target.value === "custom-people-option") {
        INPUT_CUSTOM.removeAttribute("disabled");
        peopleValue = INPUT_CUSTOM.value;
      } else {
        peopleValue = event.target.value;
        INPUT_CUSTOM.disabled = true;
        INPUT_CUSTOM.value = "";
      }
    }
  });
});

INPUT_CUSTOM.addEventListener("change", (event) => {
  peopleValue = INPUT_CUSTOM.value;
});

TIP_OPT_RADIO.forEach((option) => {
  option.addEventListener("change", (event) => {
    console.log(event.target.value);
    if (event.target.value == 0 || event.target.value) {
      if (event.target.value === "input") {
        TIP_OPTION_TYPE.removeAttribute("disabled");
        TIP_CUSTOM_INPUT.removeAttribute("disabled");
        handleTipTypeChange();
      } else {
        tipPercentValue = event.target.value / 100;
        console.log(peopleValue);
        tipCashValue = "";
        TIP_CUSTOM_INPUT.disabled = true;
        TIP_OPTION_TYPE.disabled = true;
        TIP_CUSTOM_INPUT.value = "";
        TIP_OPTION_TYPE.value = "%";
      }
    }
  });
});
const handleTipTypeChange = () => {
  if (TIP_OPTION_TYPE.value === "%") {
    tipPercentValue = TIP_CUSTOM_INPUT.value / 100;
    tipCashValue = "";
  } else if (TIP_OPTION_TYPE.value === "$") {
    tipCashValue = TIP_CUSTOM_INPUT.value;
    tipPercentValue = "";
  }
};
TIP_CUSTOM_INPUT.addEventListener("change", (event) => {
  handleTipTypeChange();
});
TIP_OPTION_TYPE.addEventListener("change", (event) => {
  handleTipTypeChange();
});

const handleOutput = () => {
  // SLICE RESULT TO 5 LETTERS SET IT TO OUTPUT
  let output = result.toString().split("").slice(0, 5).join("");
  // TURN OUTPUT BACK TO BUMBER
  Number(output);
  if (
    INPUT_TOTAL.value == "" ||
    (OPTION_CUSTOM.checked && INPUT_CUSTOM.value == "") ||
    (TIP_OPTION_CUSTOM.checked && TIP_CUSTOM_INPUT.value == "")
  ) {
    console.log("TRUE");
    OUTPUT.innerText = "Missing Inputs";
  } else if (
    TIP_OPTION_NONE.checked ||
    TIP_OPTION5.checked ||
    TIP_OPTION10.checked ||
    TIP_OPTION15.checked ||
    TIP_OPTION20.checked ||
    TIP_OPTION25.checked ||
    TIP_OPTION30.checked ||
    (TIP_OPTION_CUSTOM.checked && TIP_OPTION_TYPE.value === "%")
  ) {
    OUTPUT.innerText =
      "The split cost of $" +
      billValue +
      " for " +
      peopleValue +
      " People" +
      " with a %" +
      Number(tipPercentValue) * 100 +
      " tip is $" +
      output +
      " Each";
  } else if (TIP_OPTION_CUSTOM.checked && TIP_OPTION_TYPE.value === "$") {
    OUTPUT.innerText =
      "The split cost of $" +
      billValue +
      " for " +
      peopleValue +
      " People" +
      " with a $" +
      Number(tipCashValue) +
      " tip is $" +
      output +
      " Each";
  }
};

const handleCalculate = () => {
  handleBill();

  if (TIP_OPTION_NONE.checked) {
    result = Number(billValue) / Number(peopleValue);
  } else if (
    TIP_OPTION5.checked ||
    TIP_OPTION10.checked ||
    TIP_OPTION15.checked ||
    TIP_OPTION20.checked ||
    TIP_OPTION25.checked ||
    TIP_OPTION30.checked
  ) {
    totalPlusTip = Number(billValue) + Number(tipPercentValue * billValue);
    result = Number(totalPlusTip / peopleValue);
  } else if (TIP_OPTION_CUSTOM.checked && TIP_OPTION_TYPE.value === "%") {
    totalPlusTip = Number(billValue) + Number(tipPercentValue * billValue);
    result = Number(totalPlusTip / peopleValue);
  } else if (TIP_OPTION_CUSTOM.checked && TIP_OPTION_TYPE.value === "$") {
    totalPlusTip = Number(billValue) + Number(tipCashValue);
    result = Number(totalPlusTip) / Number(peopleValue);
  }
  handleOutput();
};

RESET_BTN.addEventListener("click", () => {
  INPUT_TOTAL.value = "";
  INPUT_CUSTOM.value = "";
  TIP_CUSTOM_INPUT.value = "";
  OUTPUT.innerText = "";
  peopleValue = "";
  billValue = "";
  tipPercentValue = "";
  tipCashValue = "";
  outCome = "";
  result = "";
  totalPlusTip = "";
  console.log("pressed");
});

// function handleTip() {
// if (TIP_OPTION_NONE.checked === true) {
//   tipCashValue = 0;
// } else if (TIP_OPTION5.checked === true) {
//   tipPercentValue = 0.05;
// } else if (TIP_OPTION10.checked === true) {
//   tipPercentValue = 0.1;
//   console.log("TRUE CHECKED");
//   console.log(tipPercentValue);
// } else if (TIP_OPTION15.checked === true) {
//   tipPercentValue = 0.15;
// } else if (TIP_OPTION20.checked === true) {
//   tipPercentValue = 0.2;
// } else if (TIP_OPTION25.checked === true) {
//   tipPercentValue = 0.25;
// } else if (TIP_OPTION30.checked === true) {
//   tipPercentValue = 0.3;
// }
//   if (TIP_OPTIONCUSTOM.checked === true && TIP_OPTION_TYPE.value === "%") {
//     let inputPercent = TIP_CUSTOM_INPUT.value / 100;
//     tipPercentValue = inputPercent;
//   } else if (TIP_OPTIONCUSTOM.checked === true && TIP_OPTION_TYPE.value === "$") {
//     tipCashValue = TIP_CUSTOM_INPUT.value;
//
