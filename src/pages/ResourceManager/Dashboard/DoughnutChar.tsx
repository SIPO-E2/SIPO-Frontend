import { Chart, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registro de componentes necesarios para Chart.js
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
      data: [120, 80],  // Datos ejemplo, ajusta según los datos reales
      backgroundColor: [
        'rgba(185, 15, 32, 0.8)',  // Rojo vino
        'rgba(200, 200, 200, 0.8)'  // Gris
      ],
      borderColor: [
        'rgba(185, 15, 32, 1)',
        'rgba(200, 200, 200, 1)'
      ],
      borderWidth: 1
    }
  ]
};

export default function DoughnutChar() {
  return (
    <div style={{ height: '300px' }}>
      <Doughnut options={options} data={data} />
    </div>
  );
}
