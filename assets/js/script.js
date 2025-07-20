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
