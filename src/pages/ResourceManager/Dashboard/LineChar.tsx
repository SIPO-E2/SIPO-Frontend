import { faker } from '@faker-js/faker';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registro de los componentes necesarios en ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false, // Importante para mantener la altura configurada
  scales: {
    y: {
      display: false, // Ocultar las escalas del eje Y
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 25
      }
    },
    x: {
      display: true,
      ticks: {
        maxTicksLimit: 12
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Salary Mean: $70,000'
    }
  }
};

const labels = Array.from({ length: 12 }, (_, i) => i + 1);  // Crea un array de 1 a 12 para el eje X

const data = {
  labels,
  datasets: [
    {
      label: 'Salary Mean',
      data: labels.map(() => faker.datatype.number({ min: 20, max: 80 })),
      borderColor: 'rgba(0, 128, 0, 1)',  // Línea de color verde
      backgroundColor: 'rgba(0, 128, 0, 0.5)',  // Relleno de color verde
    }
  ]
};

export default function LineChar() {
  return (
    <div style={{ height: '300px' }}>  
      <Line options={options} data={data} />
    </div>
  );
}
