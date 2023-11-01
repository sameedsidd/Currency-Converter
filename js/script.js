let apiKey = "ff80c51a4230d1189a8c8220";
const dropList = document.querySelectorAll(".drop-list select"),
formCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");
for (let i = 0; i < dropList.length; i++) {
    for (currency_code in country_code) {
        // selecting by default USD from form and PKR to
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1){
            selected = currency_code == "PKR" ? "selected" : "";
        }
        // create option tag with passing currency code as text or value
        let optionTag = `<option value = "${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting option tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    })

}

function loadFlag(element){
    for(let code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
})

getButton.addEventListener("click", e => {
    e.preventDefault() // prevent submiiting from form
    getExchangeRate();
})

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = formCurrency.value;
    formCurrency.value = toCurrency.value;
    toCurrency.value = tempCode
    getExchangeRate();
    loadFlag(formCurrency);
    loadFlag(toCurrency);
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;

    // if user don't enter any value or enter 0 then we'll put by default 1 value in the input;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting Exchange rate.....";
    let url = ` https://v6.exchangerate-api.com/v6/${apiKey}/latest/${formCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${formCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })  .catch(() => {
        exchangeRateTxt.innerText = "Something went wrong"
    }) ; 
}
    