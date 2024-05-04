import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

// Registro de los componentes necesarios en ChartJS
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: 'y',  // Gráfico de barras horizontales
  responsive: true,
  plugins: {
    legend: {
      display: false,  // Oculta la leyenda
    },
    title: {
      display: true,
      text: 'Programming Languages Usage',
    },
    tooltip: {
      callbacks: {
        label: function(context: { dataset: { label: any; }; parsed: { x: any; }; }) {
          return `${context.dataset.label}: ${context.parsed.x}`;
        }
      }
    }
  },
  scales: {
    x: {
      display: false,  // Oculta el eje X
    },
    y: {
      beginAtZero: true,
    }
  }
};

const labels = ['Python', 'Java', 'C#', 'Php', 'C++'];

const data = {
  labels,
  datasets: [
    {
      label: 'Units',
      data: labels.map(() => faker.datatype.number({ min: 20, max: 100 })),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Color azul para todas las barras
    }
  ],
};

export default function HorizontalBarChar() {
  return <Bar options={options as any} data={data} />;
}
