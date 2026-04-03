import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

function FormPessoa({ onAdd }) {
  const [nome, setNome] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const nomeLimpo = nome.trim();

    if (!nomeLimpo) {
      alert("Digite um nome válido");
      return;
    }

    onAdd(nomeLimpo);
    setNome("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
      <div className="flex items-center border border-gray-200 rounded-xl px-3 w-full focus-within:ring-2 focus-within:ring-purple-500">
        <FaUserPlus className="text-gray-400 mr-2" />

        <input
          placeholder="Adicionar pessoa..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full py-2 outline-none"
        />
      </div>

      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-xl">
        +
      </button>
    </form>
  );
}

export default FormPessoa;
