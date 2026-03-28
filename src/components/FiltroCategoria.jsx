function FiltroCategoria({ setCategoriaFiltro }) {
  return (
    <select
      onChange={(e) => setCategoriaFiltro(e.target.value)}
      className="p-2 rounded-xl bg-gray-100 text-sm"
    >
      <option value="">📂 Todas categorias</option>

      {categorias.map((cat) => (
        <option key={cat.nome} value={cat.nome}>
          {cat.nome}
        </option>
      ))}
    </select>
  );
}

export default FiltroCategoria;
