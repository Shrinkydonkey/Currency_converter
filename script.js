const base_url = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropDown = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropDown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "From" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "To" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
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
    let amountVal = amount.value;
    if (amountVal === "" || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }
    const url = `${base_url}/${toCurr.value}_${fromCurr.value}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.rate;
    let finalAmt = amountVal * rate;
    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
})