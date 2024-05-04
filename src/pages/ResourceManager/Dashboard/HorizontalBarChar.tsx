import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registro de los componentes necesarios en ChartJS
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem: { dataset: { label: any; }; raw: any; }) {
          return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
        }
      }
    }
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      beginAtZero: true,
    }
  }
};

const labels = ['Python', 'Java', 'C#', 'PHP', 'C++'];

const data = {
  labels,
  datasets: [
    {
      label: 'Popularidad',
      data: [500, 400, 300, 200, 100],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }
  ],
};

export default function HorizontalBarChar() {
  return (
    <div style={{ height: '300px' }}>
      <Bar options={options as any} data={data} />
    </div>
  );
}
