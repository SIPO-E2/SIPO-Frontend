import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registro de los componentes necesarios en ChartJS
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,  // Ajusta la relación de aspecto
  plugins: {
    legend: {
      display: false,  // Oculta la leyenda
    },
    title: {
      display: true,
      text: 'Bar Chart Example',
    },
  },
  scales: {
    y: {
      beginAtZero: true,  // Inicia el eje Y en 0
      suggestedMax: 32   // Sugerir un máximo para el eje Y
    }
  }
};

const labels = ['0', '1', '2', '3'];  // Etiquetas para el eje X

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset',
      data: [0, 8, 16, 24],  // Datos para cada barra
      backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Color de las barras
    }
  ],
};

export default function BarChar() {
  return (
    <div style={{ height: '300px' }}>  
      <Bar options={options} data={data} />
    </div>
  );
}
