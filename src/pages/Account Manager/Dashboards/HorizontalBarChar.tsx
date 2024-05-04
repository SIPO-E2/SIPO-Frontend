import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

// Registro de los componentes necesarios en ChartJS
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: 'y',  // Establecer el eje de las categorías en 'y' para un gráfico de barras horizontal
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },
  scales: {
    x: {
      beginAtZero: true,  // Asegurarse de que la escala comienza en 0
      max: 90  // Establecer el máximo de la escala en 90
    }
  }
};

const labels = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey'];

const data = {
  labels,
  datasets: [
    {
      label: 'Color Data',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 90 })),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',  // Red
        'rgba(255, 159, 64, 0.5)',   // Orange
        'rgba(255, 205, 86, 0.5)',   // Yellow
        'rgba(75, 192, 192, 0.5)',   // Green
        'rgba(54, 162, 235, 0.5)',   // Blue
        'rgba(153, 102, 255, 0.5)',  // Purple
        'rgba(201, 203, 207, 0.5)'   // Grey
      ],
    }
  ],
};

export default function HorizontalBarChar() {
  return <Bar options={options as any} data={data} />;
}
