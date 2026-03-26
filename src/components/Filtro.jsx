function Filtro({ pessoas, setFiltro }) {
  return (
    <select
      onChange={(e) => setFiltro(e.target.value)}
      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500"
    >
      <option value="">👥 Todas pessoas</option>
      {pessoas.map((p, i) => (
        <option key={i}>{p}</option>
      ))}
    </select>
  );
}

export default Filtro;