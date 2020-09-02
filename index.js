// SELECTORS

// PEOPLE SELECTORS

const option2 = document.getElementById("2-option");

const option3 = document.getElementById("3-option");

const option4 = document.getElementById("4-option");

const option5 = document.getElementById("5-option");

const option6 = document.getElementById("6-option");

const optionCustom = document.getElementById("input-option");

const inputCustom = document.getElementById("input-people-value-field");

// BILL SELECTORS

const inputBill = document.getElementById("input-bill-value-field");

// TIP SELECTORS
const optionTipNone = document.getElementById("no-tip-option");
const optionTip5 = document.getElementById("5%-option");
const optionTip10 = document.getElementById("10%-option");
const optionTip15 = document.getElementById("15%-option");
const optionTip20 = document.getElementById("20%-option");
const optionTip25 = document.getElementById("25%-option");
const optionTip30 = document.getElementById("30%-option");
const optionTipCustom = document.getElementById("custom-tip-option");
const optionTipType = document.getElementById("custom-tip-option-type");
const tipCustomInput = document.getElementById("custom-tip-value");

const TIP_OPT_DIV = document.querySelectorAll(".tip-selector-option");
const TIP_OPT_RADIO = document.querySelectorAll(".tip-selector");

// CALCULATE SELECTOR

const calcBtn = document.getElementById("calculate-btn");

// OUTPUT SELECTOR

const output = document.getElementById("output");

// GLOBALS

let peopleValue = "";
let billValue = "";
let tipPercentValue = "";
let tipCashValue = "";
let outCome = "";
let result = "";
let totalPlusTip = "";

// Add onclikc event to tip-selector-option class
// console.log(TIP_OPT_DIV);

/*

0 = false;
1 = true;
3847239847234 = true;
[] = false;
{} = false;
undefind

*/

// .addEventListener("click", (event) => {});

const handlePeople = () => {
  if (option2.checked === true) {
    peopleValue = 2;
  } else if (option3.checked === true) {
    peopleValue = 3;
  } else if (option4.checked === true) {
    peopleValue = 4;
  } else if (option5.checked === true) {
    peopleValue = 5;
  } else if (option6.checked === true) {
    peopleValue = 6;
  } else if (optionCustom.checked === true) {
    peopleValue = inputCustom.value;
  } else {
    outCome = "";
  }
};

function handleBill() {
  if (inputBill.value === "") {
    inputBill.value = "Enter Bill Amount";
  } else {
    billValue = inputBill.value;
  }
}

TIP_OPT_RADIO.forEach((option) => {
  option.addEventListener("change", (event) => {
    console.log(event.target.value);
    // event.target.value === 0
    if (event.target.value === 0 || event.target.value) {
      // event.target.value has something inside it
      // Check if that value === 'input'
      if (event.target.value === "input") {
        optionTipType.removeAttribute("disabled");
        tipCustomInput.removeAttribute("disabled");
        handleTipTypeChange();
      } else {
        // if we clicked on premade tip values
        tipPercentValue = event.target.value / 100;
        console.log(peopleValue);
        tipCashValue = "";
        tipCustomInput.disabled = true;
        optionTipType.disabled = true;
        tipCustomInput.value = "";
        optionTipType.value = "%";
      }
    }
  });
});
const handleTipTypeChange = () => {
  if (optionTipType.value === "%") {
    tipPercentValue = tipCustomInput.value / 100;
    tipCashValue = "";
  } else if (optionTipType.value === "$") {
    tipCashValue = tipCustomInput.value;
    tipPercentValue = "";
  }
};

tipCustomInput.addEventListener("change", (event) => {
  handleTipTypeChange();
});
optionTipType.addEventListener("change", (event) => {
  handleTipTypeChange();
});

function handleCalculate() {
  handleBill();
  handlePeople();

  if (optionTipNone.checked) {
    result = Number(billValue) / Number(peopleValue);
  } else if (
    optionTip5.checked ||
    optionTip10.checked ||
    optionTip15.checked ||
    optionTip20.checked ||
    optionTip25.checked ||
    optionTip30.checked
  ) {
    totalPlusTip = Number(billValue) + Number(tipPercentValue * billValue);
    result = Number(totalPlusTip / peopleValue);
  } else if (optionTipCustom.checked && optionTipType.value === "%") {
    totalPlusTip = Number(billValue) + Number(tipPercentValue * billValue);
    result = Number(totalPlusTip / peopleValue);
  } else if (optionTipCustom.checked && optionTipType.value === "$") {
    totalPlusTip = Number(billValue) + Number(tipCashValue);
    result = Number(totalPlusTip) / Number(peopleValue);
  }
  if (
    optionTip5.checked ||
    optionTip10.checked ||
    optionTip15.checked ||
    optionTip20.checked ||
    optionTip25.checked ||
    optionTip30.checked ||
    (optionTipCustom.checked && optionTipType.value === "%")
  ) {
    output.innerText =
      "The split cost for " +
      peopleValue +
      " People" +
      " with a %" +
      Number(tipPercentValue) * 100 +
      " tip is $" +
      result +
      " Each";
  } else if (optionTipCustom.checked && optionTipType.value === "$") {
    output.innerText =
      "The split cost for " +
      peopleValue +
      " People" +
      " with a $" +
      Number(tipCashValue) +
      " tip is $" +
      result +
      " Each";
  }
}

// function handleTip() {
// if (optionTipNone.checked === true) {
//   tipCashValue = 0;
// } else if (optionTip5.checked === true) {
//   tipPercentValue = 0.05;
// } else if (optionTip10.checked === true) {
//   tipPercentValue = 0.1;
//   console.log("TRUE CHECKED");
//   console.log(tipPercentValue);
// } else if (optionTip15.checked === true) {
//   tipPercentValue = 0.15;
// } else if (optionTip20.checked === true) {
//   tipPercentValue = 0.2;
// } else if (optionTip25.checked === true) {
//   tipPercentValue = 0.25;
// } else if (optionTip30.checked === true) {
//   tipPercentValue = 0.3;
// }
//   if (optionTipCustom.checked === true && optionTipType.value === "%") {
//     let inputPercent = tipCustomInput.value / 100;
//     tipPercentValue = inputPercent;
//   } else if (optionTipCustom.checked === true && optionTipType.value === "$") {
//     tipCashValue = tipCustomInput.value;
//   }
// }
