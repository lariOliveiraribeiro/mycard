import { useState } from "react";
import { FaTag, FaMoneyBill, FaCalendar, FaUser } from "react-icons/fa";

function FormGasto({ onAdd, pessoas, setPessoaSelecionada }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [pessoa, setPessoa] = useState("");
  const [data, setData] = useState(
    new Date().toISOString().split("T")[0]
  );
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
    <form onSubmit={handleSubmit} className="space-y-3">

      {/* Descrição */}
      <div className="flex items-center border border-gray-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-purple-500">
        <FaTag className="text-gray-400 mx-2" />
        <input
          className="w-full outline-none"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      {/* Valor */}
      <div className="flex items-center border border-gray-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-purple-500">
        <FaMoneyBill className="text-green-500 mx-2" />
        <input
          type="number"
          placeholder="Valor"
          className="w-full outline-none"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>

      {/* Data */}
      <div className="flex items-center border border-gray-200 rounded-xl p-2">
        <FaCalendar className="text-gray-400 mx-2" />
        <input
          type="date"
          className="w-full outline-none"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>

      {/* Pessoa */}
      <div className="flex items-center border border-gray-200 rounded-xl p-2">
        <FaUser className="text-gray-400 mx-2" />
        <select
          value={pessoa}
          onChange={(e) => {
            const valor = e.target.value;
            setPessoa(valor);
            setPessoaSelecionada(valor); // 🔥 AGORA FUNCIONA
          }}
          className="w-full outline-none"
        >
          <option value="">Pessoa</option>
          {pessoas.map((p, i) => (
            <option key={i}>{p}</option>
          ))}
        </select>
      </div>

      {/* Método */}
      <select
        className="w-full p-3 rounded-xl border border-gray-200"
        value={metodo}
        onChange={(e) => setMetodo(e.target.value)}
      >
        <option>Cartão</option>
        <option>Pix</option>
      </select>

      {/* Categoria */}
      <select
        className="w-full p-3 rounded-xl border border-gray-200"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option>Alimentação</option>
        <option>Restaurante</option>
        <option>Farmácia</option>
        <option>Transporte</option>
        <option>Outros</option>
      </select>

      {/* Botão */}
      <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 transition text-white p-3 rounded-xl font-semibold shadow-md">
        + Adicionar gasto
      </button>

    </form>
  );
}

export default FormGasto;