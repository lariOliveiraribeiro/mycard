import { useEffect, useState } from "react";
import FormGasto from "../components/FormGasto";
import {
  salvarGastos,
  carregarGastos,
  salvarPessoas,
  carregarPessoas,
} from "../services/storage";
import FormPessoa from "../components/FormPessoa";
import { Pencil, Trash2 } from "lucide-react";
import { Users } from "lucide-react";
import Graficos from "../components/Graficos";
import { categorias } from "../data/categoria";

function Home() {
  const [gastos, setGastos] = useState([]);
  const [pessoas, setPessoas] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [filtro, setFiltro] = useState("");
  const [mes, setMes] = useState("");
  const [pessoaSelecionada, setPessoaSelecionada] = useState(null);
  const [mostrarFiltroPessoa, setMostrarFiltroPessoa] = useState(false);

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

  function removerPessoa(id) {
    setPessoas((prev) => prev.filter((p) => p.id !== id));
    setPessoaSelecionada("");
  }

  function adicionarPessoa(nome) {
    const novaPessoa = {
      id: Date.now(),
      nome,
    };

    setPessoas((prev) => [...prev, novaPessoa]);
  }

  function editarPessoa(id) {
    const novoNome = prompt("Novo nome:");
    if (!novoNome) return;

    setPessoas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, nome: novoNome } : p)),
    );
  }

  function adicionarGasto(gasto) {
    setGastos((prev) => [gasto, ...prev]);
  }

  function removerGasto(id) {
    setGastos((prev) => prev.filter((g) => g.id !== id));
  }

  const gastosFiltrados = gastos.filter((g) => {
    const filtroPessoa = !filtro || g.pessoaId === Number(filtro);

    const filtroMes = !mes || g.data.startsWith(mes);
    const filtroCategoria = !categoriaFiltro || g.categoria === categoriaFiltro;

    function getCategoriaInfo(nome) {
      return categorias.find((c) => c.nome === nome);
    }

    return filtroPessoa && filtroMes && filtroCategoria;
  });

  const total = gastosFiltrados.reduce((acc, g) => acc + g.valor, 0);

  function getCategoriaCor(nome) {
    const categoria = categorias.find((c) => c.nome === nome);
    return categoria?.cor || "bg-gray-100 text-gray-700";
  }

  function getMetodoCor(metodo) {
    return metodo === "Pix"
      ? "bg-green-100 text-green-700"
      : "bg-purple-100 text-purple-700";
  }

  function getCategoriaInfo(nome) {
    return categorias.find((c) => c.nome === nome);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* HEADER */}
        <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white p-1 rounded-3xl shadow-lg relative overflow-hidden">
          {/* Efeito de brilho */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/10 blur-2xl opacity-20"></div>

          <div className="relative z-10">
            {/* Topo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={`${import.meta.env.BASE_URL}LOGO (3).png`}
                  alt="logo"
                  className="w-20 h-20"
                />
                <h1 className="text-sm font-medium tracking-wide">MyCard</h1>
              </div>
            </div>

            {/* Saldo */}
            <div className="mt-1 text-center">
              <p className="text-xs opacity-70">Saldo Total</p>
              <h2 className="text-4xl font-bold tracking-tight">
                {total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h2>
            </div>
          </div>
        </div>

        {/* FILTRO DE PESSOA */}
        <div className="relative">
          <button
            onClick={() => setMostrarFiltroPessoa(!mostrarFiltroPessoa)}
            className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl text-sm"
          >
            <Users className="w-4 h-4 text-gray-500" />
            <span>
              {pessoas.find((p) => p.id === Number(filtro))?.nome || "Pessoas"}
            </span>
          </button>

          {mostrarFiltroPessoa && (
            <div
              onMouseLeave={() => setMostrarFiltroPessoa(false)}
              className="absolute mt-2 w-48 bg-white rounded-2xl shadow-lg p-2 z-50"
            >
              <button
                onClick={() => {
                  setFiltro("");
                  setMostrarFiltroPessoa(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
              >
                Todos
              </button>

              {pessoas.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setFiltro(p.id);
                    setMostrarFiltroPessoa(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    filtro === p.id ? "bg-purple-100" : "hover:bg-gray-100"
                  }`}
                >
                  {p.nome}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FORM */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
          <FormPessoa onAdd={adicionarPessoa} />

          <FormGasto
            onAdd={adicionarGasto}
            pessoas={pessoas}
            onSelectPessoa={setPessoaSelecionada}
          />

          {/* MINI MENU DA PESSOA */}
          {pessoaSelecionada && (
            <div className="bg-gray-50 px-3 py-2 rounded-xl flex justify-between items-center mt-2 text-sm">
              <span>
                {pessoas.find((p) => p.id === pessoaSelecionada)?.nome}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => editarPessoa(pessoaSelecionada)}
                  className="text-blue-500"
                >
                  <Pencil className="w-4 h-4 text-blue-500" />
                </button>

                <button
                  onClick={() => removerPessoa(pessoaSelecionada)}
                  className="text-red-500"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FILTROS */}
        <div className="bg-white p-4 rounded-3xl shadow-sm">
          <h3 className="text-sm font-semibold mb-3">Filtros</h3>

          <div className="grid grid-cols-2 gap-3">
            <select
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="p-2 rounded-xl bg-gray-100 text-sm"
            >
              <option value="">Categoria</option>
              {categorias.map((cat) => (
                <option key={cat.nome} value={cat.nome}>
                  {cat.nome}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setFiltro(e.target.value)}
              className="p-2 rounded-xl bg-gray-100 text-sm"
            >
              <option value="">Pessoa</option>
              {pessoas.map((p, i) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>

            <input
              type="month"
              onChange={(e) => setMes(e.target.value)}
              className="p-2 rounded-xl bg-gray-100 text-sm"
            />

            <button className="bg-purple-600 text-white rounded-xl text-sm">
              Filtrar
            </button>
          </div>
        </div>

        <Graficos gastos={gastosFiltrados} />

        {/* LISTA */}
        <ul className="space-y-2">
          {gastosFiltrados.map((g) => {
            const pessoaObj = pessoas.find((p) => p.id === g.pessoaId);

            return (
              <li
                key={g.id}
                className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {/* Ícone */}
                  {(() => {
                    const categoria = getCategoriaInfo(g.categoria);

                    return (
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${categoria?.cor}`}
                      >
                        <span className="text-xs font-bold">
                          {g.categoria?.charAt(0)}
                        </span>
                      </div>
                    );
                  })()}

                  {/* Info */}
                  <div>
                    <p className="font-semibold text-sm">{g.descricao}</p>

                    <p className="text-sm opacity-70 text-gray-400">
                      {pessoaObj?.nome} • {g.data}
                    </p>
                  </div>
                </div>

                {/* Valor */}
                <div className="text-right">
                  <p className="text-red-500 font-bold text-sm">
                    {g.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  <button
                    onClick={() => removerGasto(g.id)}
                    className="text-gray-300 hover:text-red-500 text-xs"
                  >
                    remover
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Home;
