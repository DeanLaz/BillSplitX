// SELECTORS

// PEOPLE SELECTORS

const OPTION2 = document.getElementById("2-option");

const OPTION3 = document.getElementById("3-option");

const OPTION4 = document.getElementById("4-option");

const OPTION5 = document.getElementById("5-option");

const OPTION6 = document.getElementById("6-option");

const OPTION_CUSTOM = document.getElementById("input-option");

const INPUT_CUSTOM = document.getElementById("input-people-value-field");

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
const TIP_CUSTOM_INPUT = document.getElementById("custom-tip-value");

const TIP_OPT_DIV = document.querySelectorAll(".tip-selector-option");
const TIP_OPT_RADIO = document.querySelectorAll(".tip-selector");

// CALCULATE SELECTOR

const CALC_BTN = document.getElementById("calculate-btn");

// OUTPUT SELECTOR

const OUTPUT = document.getElementById("OUTPUT");

// GLOBALS

let peopleValue = "";
let billValue = "";
let tipPercentValue = "";
let tipCashValue = "";
let outCome = "";
let result = "";
let totalPlusTip = "";

// .addEventListener("click", (event) => {});

const handlePeople = () => {
  if (OPTION2.checked === true) {
    peopleValue = 2;
  } else if (OPTION3.checked) {
    peopleValue = 3;
  } else if (OPTION4.checked) {
    peopleValue = 4;
  } else if (OPTION5.checked) {
    peopleValue = 5;
  } else if (OPTION6.checked) {
    peopleValue = 6;
  } else if (OPTION_CUSTOM.checked) {
    peopleValue = INPUT_CUSTOM.value;
  } else {
    outCome = "";
  }
};

const handleBill = () => {
  if (INPUT_TOTAL.value === "") {
    INPUT_TOTAL.value = "Enter Bill Amount";
  } else {
    billValue = INPUT_TOTAL.value;
  }
};

TIP_OPT_RADIO.forEach((option) => {
  option.addEventListener("change", (event) => {
    console.log(event.target.value);
    // event.target.value === 0
    if (event.target.value === 0 || event.target.value) {
      // event.target.value has something inside it
      // Check if that value === 'input'
      if (event.target.value === "input") {
        TIP_OPTION_TYPE.removeAttribute("disabled");
        TIP_CUSTOM_INPUT.removeAttribute("disabled");
        handleTipTypeChange();
      } else {
        // if we clicked on premade tip values
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

const handleCalculate = () => {
  handleBill();
  handlePeople();

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
  } else if (TIP_OPTIONCUSTOM.checked && TIP_OPTION_TYPE.value === "%") {
    totalPlusTip = Number(billValue) + Number(tipPercentValue * billValue);
    result = Number(totalPlusTip / peopleValue);
  } else if (TIP_OPTIONCUSTOM.checked && TIP_OPTION_TYPE.value === "$") {
    totalPlusTip = Number(billValue) + Number(tipCashValue);
    result = Number(totalPlusTip) / Number(peopleValue);
  }
  if (
    TIP_OPTION5.checked ||
    TIP_OPTION10.checked ||
    TIP_OPTION15.checked ||
    TIP_OPTION20.checked ||
    TIP_OPTION25.checked ||
    TIP_OPTION30.checked ||
    (TIP_OPTIONCUSTOM.checked && TIP_OPTION_TYPE.value === "%")
  ) {
    OUTPUT.innerText =
      "The split cost for " +
      peopleValue +
      " People" +
      " with a %" +
      Number(tipPercentValue) * 100 +
      " tip is $" +
      result +
      " Each";
  } else if (TIP_OPTIONCUSTOM.checked && TIP_OPTION_TYPE.value === "$") {
    OUTPUT.innerText =
      "The split cost for " +
      peopleValue +
      " People" +
      " with a $" +
      Number(tipCashValue) +
      " tip is $" +
      result +
      " Each";
  }
};

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
//   }
// }
