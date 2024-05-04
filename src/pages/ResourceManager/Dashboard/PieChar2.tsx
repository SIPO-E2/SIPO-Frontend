import { Chart, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Registro de los componentes necesarios en ChartJS
Chart.register(ArcElement, Tooltip, Legend);

const options: any = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    tooltip: {
      enabled: true
    }
  }
};

const data = {
  labels: ['Hombres', 'Mujeres'],
  datasets: [
    {
      label: 'Demografía',
      data: [300, 200],  // Cantidad ejemplo, ajusta según los datos reales
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',  // Azul
        'rgba(255, 99, 132, 0.8)'   // Rojo
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }
  ]
};

export default function PieChar2() {
  return (
    <div style={{ height: '300px' }}>
      <Pie data={data} options={options as any} />
    </div>
  );
}
