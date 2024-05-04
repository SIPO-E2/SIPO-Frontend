import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registro de los componentes necesarios en ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,  // Ajusta la relación de aspecto
  scales: {
    y: {
      min: 0,
      max: 250,  // Rango del eje Y de 0 a 250
      ticks: {
        stepSize: 50
      }
    },
    x: {
      title: {
        display: true,

      }
    }
  },
  plugins: {
    legend: {
      display: true
    }
  }
};

const data = {
  labels: ['1', '2', '3', '4', '5'],  // Grupos en el eje X
  datasets: [
    {
      label: 'Bench',
      data: [150, 100, 200, 175, 125],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Pipeline',
      data: [120, 190, 160, 140, 180],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: 'Billing',
      data: [130, 180, 120, 160, 190],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }
  ]
};

export default function BarChar2() {
  return (
    <div style={{ height: '300px' }}>
      <Bar options={options} data={data} />
    </div>
  );
}
