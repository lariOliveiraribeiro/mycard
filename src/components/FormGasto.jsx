import { useState } from "react";
import { Tag, DollarSign, Calendar, User, CreditCard } from "lucide-react";
import { categorias } from "../data/categoria";

function FormGasto({ onAdd, pessoas, onSelectPessoa }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [pessoa, setPessoa] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [metodo, setMetodo] = useState("");
  const [categoria, setCategoria] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const valorNumero = Number(valor.replace(/\D/g, "")) / 100;

    if (!valor || valorNumero <= 0) {
      alert("Digite um valor válido maior que 0");
      return;
    }

    if (!descricao.trim()) {
      alert("Digite uma descrição");
      return;
    }

    if (!pessoa) {
      alert("Selecione uma pessoa");
      return;
    }

    if (!metodo) {
      alert("Selecione um método de pagamento");
      return;
    }

    if (!categoria) {
      alert("Selecione uma categoria");
      return;
    }

    const novoGasto = {
      id: Date.now(),
      descricao,
      valor: valorNumero,
      pessoaId: Number(pessoa),
      data,
      metodo,
      categoria,
    };

    onAdd(novoGasto);

    setDescricao("");
    setValor("");
    setPessoa("");
  }
  function formatarMoeda(valor) {
    const numero = valor.replace(/\D/g, "");

    const numeroFloat = Number(numero) / 100;

    return numeroFloat.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Descrição */}
      <div className="flex items-center bg-gray-50 rounded-xl p-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
        <div className="bg-purple-100 p-2 rounded-lg mr-2">
          <Tag className="w-4 h-4 text-purple-600" />
        </div>
        <input
          className="w-full bg-transparent outline-none text-sm"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      {/* Valor */}
      <div className="flex items-center bg-gray-50 rounded-xl p-3 focus-within:ring-2 focus-within:ring-green-500 transition">
        <div className="bg-green-100 p-2 rounded-lg mr-2">
          <DollarSign className="w-4 h-4 text-green-600" />
        </div>
        <input
          type="text"
          placeholder="Valor"
          className="w-full bg-transparent outline-none text-sm"
          value={formatarMoeda(valor)}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>

      {/* Data */}
      <div className="flex items-center bg-gray-50 rounded-xl p-3">
        <div className="bg-gray-200 p-2 rounded-lg mr-2">
          <Calendar className="w-4 h-4 text-gray-600" />
        </div>
        <input
          type="date"
          className="w-full bg-transparent outline-none text-sm"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      {/* Pessoa */}
      <div className="flex items-center bg-gray-50 rounded-xl p-3">
        <div className="bg-blue-100 p-2 rounded-lg mr-2">
          <User className="w-4 h-4 text-blue-600" />
        </div>
        <select
          value={pessoa}
          onChange={(e) => {
            const valor = e.target.value;
            setPessoa(Number(valor));
            onSelectPessoa(Number(valor));
          }}
          className="w-full bg-transparent outline-none text-sm"
        >
          <option value="">Pessoa</option>
          {pessoas.map((p, i) => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Método */}
      <div className="bg-gray-50 rounded-xl p-3">
        <p className="text-xs text-gray-400 mb-2">Pagamento</p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMetodo("Cartão")}
            className={`flex-1 p-2 rounded-lg text-sm font-medium transition
        ${
          metodo === "Cartão"
            ? "bg-purple-600 text-white"
            : "bg-white text-gray-600 border"
        }`}
          >
            Cartão
          </button>

          <button
            type="button"
            onClick={() => setMetodo("Pix")}
            className={`flex-1 p-2 rounded-lg text-sm font-medium transition
        ${
          metodo === "Pix"
            ? "bg-green-500 text-white"
            : "bg-white text-gray-600 border"
        }`}
          >
            Pix
          </button>
        </div>
      </div>

      {/* Categoria */}
      <div className="bg-gray-50 rounded-xl p-3">
        <p className="text-xs text-gray-400 mb-2">Categoria</p>

        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button
              key={cat.nome}
              type="button"
              onClick={() => setCategoria(cat.nome)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition
          ${
            categoria === cat.nome
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-600 border"
          }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Botão */}
      <button
        className="w-full bg-gradient-to-r from-purple-600 to-purple-800 
    text-white p-3 rounded-xl font-semibold shadow-lg 
    hover:scale-[1.02] active:scale-[0.98] transition"
      >
        + Adicionar gasto
      </button>
    </form>
  );
}

export default FormGasto;
