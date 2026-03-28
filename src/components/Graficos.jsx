import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
} from "recharts";

function Graficos({ gastos }) {
  if (!gastos || gastos.length === 0) {
    return (
      <div className="bg-white p-4 rounded-3xl shadow-sm text-center text-gray-400 text-sm">
        Sem dados para exibir gráfico
      </div>
    );
  }

  // 🔹 AGRUPAR POR CATEGORIA
  const categorias = {};

  gastos.forEach((g) => {
    if (!categorias[g.categoria]) {
      categorias[g.categoria] = 0;
    }
    categorias[g.categoria] += g.valor;
  });

  const dadosPizza = Object.keys(categorias).map((cat) => ({
    name: cat,
    value: categorias[cat],
  }));

  // 🔹 AGRUPAR POR MÊS
  const meses = {};

  gastos.forEach((g) => {
    const mes = g.data.slice(0, 7);
    if (!meses[mes]) meses[mes] = 0;
    meses[mes] += g.valor;
  });

  const dadosBarra = Object.keys(categorias).map((cat) => ({
    categoria: cat,
    valor: categorias[cat],
  }));

  const coresCategoria = {
    Alimentação: "#facc15",
    Restaurante: "#fb923c",
    Farmácia: "#4ade80",
    Transporte: "#60a5fa",
  };

  return (
    <div className="bg-white p-4 rounded-3xl shadow-sm space-y-4">
      <h3 className="text-sm font-semibold">Análise de Gastos</h3>

      {/* 🔵 GRÁFICO DE PIZZA */}
      <div className="w-full h-52">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={dadosPizza}
              dataKey="value"
              nameKey="name"
              outerRadius={70}
              fill="#7c3aed"
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🟣 GRÁFICO DE BARRA */}
      <div className="w-full h-52">
        <ResponsiveContainer>
          <BarChart data={dadosBarra}>
            <XAxis dataKey="categoria" />
            <Tooltip />
            <Bar dataKey="valor" fill="#7c3aed" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graficos;
