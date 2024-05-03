import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

// Registro de los componentes necesarios
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Opciones definidas con tipo explícito, asegurándose de que coincida con los tipos esperados
const options = {
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
    y: {
      beginAtZero: true,
    }
  }
};

const labels = ['A', 'B', 'C', 'D', 'E'];

const data = {
  labels,
  datasets: [
    {
      label: 'Job Position',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(59, 199, 96, 0.5)',
    },
    {
      label: 'Openings',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function BarChar() {
  return <Bar options={options as any} data={data} />;
}
