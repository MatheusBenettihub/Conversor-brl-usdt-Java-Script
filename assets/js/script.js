
document.addEventListener("DOMContentLoaded", () => {
  const amountInput = document.getElementById("amount");     
  const converterInput = document.getElementById("converter"); 


  // Conversion

  amountInput.addEventListener("input", () => {
    const valor = parseFloat(amountInput.value); 

    if (!isNaN(valor)) {
      converterInput.value = valor ; 
    } else {
      converterInput.value = ""; 
    }
  });
});
const exchangeRateText = document.getElementById('exchange-rate');

// get the real value of the dollar
async function getDollarRate() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const data = await response.json();
    const rate = parseFloat(data.USDBRL.bid).toFixed(2);


    // Att HTML
    exchangeRateText.textContent = `Taxa de câmbio comercial: $1 USD = R$ ${rate}`;
  } catch (error) {
    exchangeRateText.textContent = 'Erro ao carregar a taxa de câmbio.';
    console.error('Erro ao buscar o valor do dólar:', error);
  }
}


getDollarRate();

let isOriginalOrder = true; 

// Elements
const amountInput = document.getElementById('amount');
const outputInput = document.getElementById('converter');
const amountLabel = document.getElementById('amount-label');
const converterLabel = document.getElementById('converter-label');
const leftFlag = document.getElementById('left-flag');
const rightFlag = document.getElementById('right-flag');


amountInput.addEventListener('input', converter);


// change button
document.getElementById('swap').addEventListener('click', () => {
  isOriginalOrder = !isOriginalOrder;

  if (isOriginalOrder) {
    leftFlag.src = 'assets/img/Brazilian_flag_icon_round.svg.png';
    leftFlag.alt = 'Bandeira do Brasil';
    rightFlag.src = 'assets/img/United-states_flag_icon_round.svg (1).png';
    rightFlag.alt = 'Bandeira dos Estados Unidos';
    amountLabel.textContent = 'Quantia em BRL:';

  } else {
    leftFlag.src = 'assets/img/United-states_flag_icon_round.svg (1).png';
    leftFlag.alt = 'Bandeira dos Estados Unidos';
    rightFlag.src = 'assets/img/Brazilian_flag_icon_round.svg.png';
    rightFlag.alt = 'Bandeira do Brasil';
    amountLabel.textContent = 'Quantia em USD:';
  
  }

  converter(); 
});

async function converter() {
  const inputValue = parseFloat(amountInput.value.replace(',', '.'));
  if (isNaN(inputValue)) {
    outputInput.value = '';
    return;
  }

  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const data = await response.json();
    const rate = parseFloat(data.USDBRL.bid);

    if (isOriginalOrder) {
      const result = inputValue / rate;
      outputInput.value = result.toFixed(2);
    } else {
      const result = inputValue * rate;
      outputInput.value = result.toFixed(2);
    }
  } catch (error) {
    outputInput.value = 'Erro';
    console.error('Erro ao buscar taxa de câmbio:', error);
  }
}

//returnbutton
const butto = document.getElementById('return');
  
butto.addEventListener('click', () => {
 window.scrollTo({
  top:0,
  behavior:"smooth"
 });

});