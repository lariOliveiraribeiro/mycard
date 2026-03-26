function FiltroMes({ setMes }) {
  return (
    <input
      type="month"
      onChange={(e) => setMes(e.target.value)}
      className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500"
    />
  );
}

export default FiltroMes;