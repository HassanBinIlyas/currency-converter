const baseURL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromC = document.querySelector('.from select');
const toC = document.querySelector('.to select');
const msg = document.querySelector('.msg');
for(let select of dropdowns){
    for(cCode in cList){
        let nOp = document.createElement('option');
        nOp.innerText = cCode;
        nOp.value = cCode;
        if(select.name === 'from' && cCode === 'USD'){
            nOp.selected = 'selected';
        }
        else if(select.name === 'to' && cCode === 'PKR'){
            nOp.selected = 'selected';
        }
        select.append(nOp);
    }
    select.addEventListener('change', (evnt) => {
        uFlag(evnt.target);
    });
}

const uFlag = (elmnt) => {
    let cCode = elmnt.value;
    let cntryCode = cList[cCode];
    let newSrc = `https://flagsapi.com/${cntryCode}/shiny/64.png`;
    let img = elmnt.parentElement.querySelector('img');
    img.src = newSrc;
}
const updateConversion = async () => {
    let amount = document.querySelector('form input');
    let amtVal = amount.value;
    if(amtVal === '' || amount < 1){
        amount = 1;
        amtVal = '1';
    }
    const url = `${baseURL}/${fromC.value.toLowerCase()}.json`;
    let res = await fetch(url);
    let data = await res.json();
    let rate = data[fromC.value.toLowerCase()][toC.value.toLowerCase()];
    let finalAmont = amtVal * rate;
    msg.innerText = `${amtVal} ${fromC.value} = ${finalAmont} ${toC.value}`
}

window.addEventListener('load', () => {
    updateConversion();
});

btn.addEventListener('click', (evnt) => {
    evnt.preventDefault();
    updateConversion();
});