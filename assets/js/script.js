// Espera até que o HTML esteja totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
  const amountInput = document.getElementById("amount");     // Caixa de entrada
  const converterInput = document.getElementById("converter"); // Caixa de saída

  // Escuta qualquer mudança no campo "amount"
  amountInput.addEventListener("input", () => {
    const valor = parseFloat(amountInput.value); // Converte para número

    if (!isNaN(valor)) {
      converterInput.value = valor + 1; // Mostra o valor + 1
    } else {
      converterInput.value = ""; // Se não for número, limpa a saída
    }
  });
});
const exchangeRateText = document.getElementById('exchange-rate');

// Função para buscar o valor do dólar em tempo real
async function getDollarRate() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const data = await response.json();
    const rate = parseFloat(data.USDBRL.bid).toFixed(2);

    // Atualiza o texto no HTML
    exchangeRateText.textContent = `Taxa de câmbio comercial: $1 USD = R$ ${rate}`;
  } catch (error) {
    exchangeRateText.textContent = 'Erro ao carregar a taxa de câmbio.';
    console.error('Erro ao buscar o valor do dólar:', error);
  }
}

// Chama a função ao carregar a página
getDollarRate();

let isOriginalOrder = true; // true = BRL → USD, false = USD → BRL

// Elementos
const amountInput = document.getElementById('amount');
const outputInput = document.getElementById('converter');
const amountLabel = document.getElementById('amount-label');
const converterLabel = document.getElementById('converter-label');
const leftFlag = document.getElementById('left-flag');
const rightFlag = document.getElementById('right-flag');

// Atualiza a conversão em tempo real ao digitar
amountInput.addEventListener('input', converter);

// Botão de troca
document.getElementById('swap').addEventListener('click', () => {
  isOriginalOrder = !isOriginalOrder;

  if (isOriginalOrder) {
    leftFlag.src = 'assets/img/Brazilian_flag_icon_round.svg.png';
    leftFlag.alt = 'Bandeira do Brasil';
    rightFlag.src = 'assets/img/United-states_flag_icon_round.svg (1).png';
    rightFlag.alt = 'Bandeira dos Estados Unidos';
    amountLabel.textContent = 'Quantia em BRL:';
    converterLabel.textContent = 'Valor convertido:';
  } else {
    leftFlag.src = 'assets/img/United-states_flag_icon_round.svg (1).png';
    leftFlag.alt = 'Bandeira dos Estados Unidos';
    rightFlag.src = 'assets/img/Brazilian_flag_icon_round.svg.png';
    rightFlag.alt = 'Bandeira do Brasil';
    amountLabel.textContent = 'Quantia em USD:';
    converterLabel.textContent = 'Valor convertido:';
  }

  converter(); // Recalcula após troca
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