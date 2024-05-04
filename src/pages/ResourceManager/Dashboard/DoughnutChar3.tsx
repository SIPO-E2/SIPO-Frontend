import { Chart, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registro de los componentes necesarios en ChartJS
Chart.register(ArcElement, Tooltip, Legend);

const options: any = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    },
    title: {
      display: true,
      text: 'Active People',
      position: 'bottom'
    }
  },
  cutout: '50%'
};

const data = {
  labels: ['Active', 'Inactive'],
  datasets: [
    {
      label: 'Population',
      data: [60, 140],  // Datos ejemplo, ajusta según los datos reales
      backgroundColor: [
        'rgba(0, 128, 0, 0.8)',  // Verde
        'rgba(200, 200, 200, 0.8)'  // Gris
      ],
      borderColor: [
        'rgba(0, 128, 0, 1)',
        'rgba(200, 200, 200, 1)'
      ],
      borderWidth: 1
    }
  ]
};

export default function DoughnutChar3() {
  return (
    <div style={{ height: '300px' }}>
      <Doughnut options={options} data={data} />
    </div>
  );
}
