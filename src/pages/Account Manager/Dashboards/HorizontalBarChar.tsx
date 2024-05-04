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
      text: 'Horizontal Bar Chart Example',
    },
  },
  scales: {
    x: {
      beginAtZero: true,  // Asegurarse de que la escala comienza en 0
      max: 90  // Establecer el máximo de la escala en 90
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 90 })),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }
  ],
};

export default function HorizontalBarChar() {
  return <Bar options={options as any} data={data} />;
}
