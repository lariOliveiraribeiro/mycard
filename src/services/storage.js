export function salvarGastos(gastos) {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

export function carregarGastos() {
  const dados = localStorage.getItem("gastos");
  return dados ? JSON.parse(dados) : [];
}

export function salvarPessoas(pessoas) {
  localStorage.setItem("pessoas", JSON.stringify(pessoas));
}

export function carregarPessoas() {
  const dados = localStorage.getItem("pessoas");

  if (!dados) return [];

  return JSON.parse(dados);
}