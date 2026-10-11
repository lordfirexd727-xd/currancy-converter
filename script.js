const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");

    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amountval = amount.value;

  if (amountval === "" || amountval < 1) {
    amountval = 1;
    amount.value = "1";
  }

  const URL = `https://open.er-api.com/v6/latest/${fromcurr.value}`;

  let response = await fetch(URL);
  let data = await response.json();

  let rate = data.rates[tocurr.value];

  let finalamount = amountval * rate ;
  msg.innerText =  `${amountval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`

});