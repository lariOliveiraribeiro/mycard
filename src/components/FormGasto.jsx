import { useState } from "react";
import { Tag, DollarSign, Calendar, User, CreditCard } from "lucide-react";
import { categorias } from "../data/categoria";

function FormGasto({ onAdd, pessoas, onSelectPessoa }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [pessoa, setPessoa] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [metodo, setMetodo] = useState("Cartão");
  const [categoria, setCategoria] = useState("Alimentação");

  function handleSubmit(e) {
    e.preventDefault();

    const novoGasto = {
      id: Date.now(),
      descricao,
      valor: Number(valor),
      pessoa,
      data,
      metodo,
      categoria,
    };

    onAdd(novoGasto);

    setDescricao("");
    setValor("");
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
          type="number"
          placeholder="Valor"
          className="w-full bg-transparent outline-none text-sm"
          value={valor}
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
            setPessoa(valor);
            onSelectPessoa(valor);
          }}
          className="w-full bg-transparent outline-none text-sm"
        >
          <option value="">Pessoa</option>
          {pessoas.map((p, i) => (
            <option key={i} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Método */}
      <div className="flex items-center bg-gray-50 rounded-xl p-3">
        <div className="bg-purple-100 p-2 rounded-lg mr-2">
          <CreditCard className="w-4 h-4 text-purple-600" />
        </div>

        <select
          className="w-full bg-transparent outline-none text-sm"
          value={metodo}
          onChange={(e) => setMetodo(e.target.value)}
        >
          <option value="Cartão">Cartão</option>
          <option value="Pix">Pix</option>
        </select>
      </div>

      {/* Categoria */}
      <div className="flex items-center bg-gray-50 rounded-xl p-3">
        <div className="bg-purple-100 p-2 rounded-lg mr-2">
          <Tag className="w-4 h-4 text-purple-600" />
        </div>

        <select
          className="w-full bg-transparent outline-none text-sm"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categorias.map((cat) => (
            <option key={cat.nome} value={cat.nome}>
              {cat.nome}
            </option>
          ))}
        </select>
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
