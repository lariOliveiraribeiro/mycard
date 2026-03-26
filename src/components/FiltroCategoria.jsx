function FiltroCategoria({ setCategoriaFiltro }) {
  return (
    <select
      onChange={(e) => setCategoriaFiltro(e.target.value)}
      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500"
    >
      <option value="">📂 Todas categorias</option>
      <option>Alimentação</option>
      <option>Restaurante</option>
      <option>Farmácia</option>
      <option>Transporte</option>
      <option>Outros</option>
    </select>
  );
}

export default FiltroCategoria;