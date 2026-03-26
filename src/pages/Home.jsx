import { useEffect, useState } from "react";
import FormGasto from "../components/FormGasto";
import { salvarGastos, carregarGastos, salvarPessoas, carregarPessoas } from "../services/storage";
import FormPessoa from "../components/FormPessoa";

function Home() {
  const [gastos, setGastos] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [filtro, setFiltro] = useState("");
  const [mes, setMes] = useState("");
  const [pessoaSelecionada, setPessoaSelecionada] = useState("");
  

  useEffect(() => {
    setPessoas(carregarPessoas());
    setGastos(carregarGastos());
  }, []);

  useEffect(() => {
    salvarPessoas(pessoas);
  }, [pessoas]);

  useEffect(() => {
    salvarGastos(gastos);
  }, [gastos]);
  

  function adicionarPessoa(nome) {
    setPessoas((prev) => [...prev, nome]);
  }

  function removerPessoa(index) {
    setPessoas((prev) => prev.filter((_, i) => i !== index));
    setPessoaSelecionada("");
  }

  function editarPessoa(index) {
    const novoNome = prompt("Novo nome:");
    if (!novoNome) return;

    setPessoas((prev) =>
      prev.map((p, i) => (i === index ? novoNome : p))
    );
  }

  function adicionarGasto(gasto) {
    setGastos((prev) => [gasto, ...prev]);
  }

  function removerGasto(id) {
    setGastos((prev) => prev.filter((g) => g.id !== id));
  }

  const total = gastos.reduce((acc, g) => acc + g.valor, 0);

  const gastosFiltrados = gastos.filter((g) => {
    const filtroPessoa = !filtro || g.pessoa === filtro;
    const filtroMes = !mes || g.data.startsWith(mes);
    const filtroCategoria = !categoriaFiltro || g.categoria === categoriaFiltro;

    return filtroPessoa && filtroMes && filtroCategoria;
  });

  function getCategoriaCor(categoria) {
    switch (categoria) {
      case "Alimentação":
        return "bg-yellow-100 text-yellow-700";
      case "Restaurante":
        return "bg-orange-100 text-orange-700";
      case "Farmácia":
        return "bg-green-100 text-green-700";
      case "Transporte":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function getMetodoCor(metodo) {
    return metodo === "Pix"
      ? "bg-green-100 text-green-700"
      : "bg-purple-100 text-purple-700";
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-md space-y-4">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-3xl shadow-lg">
          <h1 className="text-2xl font-bold">MyCard 💳</h1>
          <p className="text-sm opacity-80">Controle de gastos</p>

          <div className="mt-4">
            <p className="text-sm">Saldo total</p>
            <h2 className="text-3xl font-bold">
              R$ {total.toFixed(2)}
            </h2>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
          <FormPessoa onAdd={adicionarPessoa} />

          <FormGasto
            onAdd={adicionarGasto}
            pessoas={pessoas}
            setPessoaSelecionada={setPessoaSelecionada}
          />

          {/* MINI MENU DA PESSOA */}
          {pessoaSelecionada && (
  <div className="bg-gray-50 px-3 py-2 rounded-xl flex justify-between items-center mt-2 text-sm">
    <span>{pessoaSelecionada}</span>

    <div className="flex gap-2">
      <button
        onClick={() => editarPessoa(pessoas.indexOf(pessoaSelecionada))}
        className="text-blue-500"
      >
        ✏️
      </button>

      <button
        onClick={() => removerPessoa(pessoas.indexOf(pessoaSelecionada))}
        className="text-red-500"
      >
        ❌
      </button>
    </div>
  </div>
)}
        </div>

        {/* FILTROS */}
<div className="bg-white p-4 rounded-3xl shadow-sm space-y-3">

  <p className="text-xs text-gray-400">Filtros</p>

  {/* 👥 Pessoas */}
  <div className="flex gap-2 overflow-x-auto">
    <button
      onClick={() => setFiltro("")}
      className={`px-3 py-1 rounded-full text-sm ${
        filtro === "" ? "bg-purple-600 text-white" : "bg-gray-200"
      }`}
    >
      Todos
    </button>

    {pessoas.map((p, i) => (
      <button
        key={i}
        onClick={() => setFiltro(p)}
        className={`px-3 py-1 rounded-full text-sm ${
          filtro === p ? "bg-purple-600 text-white" : "bg-gray-200"
        }`}
      >
        {p}
      </button>
    ))}
  </div>

  {/* 📂 Categorias */}
  <div className="flex gap-2 overflow-x-auto">
    {["", "Alimentação", "Restaurante", "Farmácia", "Transporte"].map((cat, i) => (
      <button
        key={i}
        onClick={() => setCategoriaFiltro(cat)}
        className={`px-3 py-1 rounded-full text-sm ${
          categoriaFiltro === cat ? "bg-purple-600 text-white" : "bg-gray-200"
        }`}
      >
        {cat || "Todas"}
      </button>
    ))}
  </div>

  {/* 📅 Mês */}
  <input
    type="month"
    onChange={(e) => setMes(e.target.value)}
    className="w-full bg-gray-100 px-3 py-2 rounded-xl text-sm"
  />

</div>

        {/* LISTA */}
        <ul className="space-y-2">
          {gastosFiltrados.map((g) => (
            <li
              key={g.id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition flex justify-between items-center"
            >
              <div className="space-y-1">
                <p className="font-semibold">{g.descricao}</p>

                <div className="flex gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-1 rounded-full ${getMetodoCor(g.metodo)}`}>
                    {g.metodo}
                  </span>

                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoriaCor(g.categoria)}`}>
                    {g.categoria}
                  </span>

                  <span className="text-xs text-gray-500">{g.pessoa}</span>
                </div>

                <p className="text-xs text-gray-400">{g.data}</p>
              </div>

              <div className="text-right">
                <p className="text-red-500 font-bold text-lg">
                  R$ {g.valor.toFixed(2)}
                </p>

                <button
                  onClick={() => removerGasto(g.id)}
                  className="text-gray-400 hover:text-red-500 transition text-sm mt-1"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default Home;