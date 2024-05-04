import { Chart, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registro de los componentes necesarios en ChartJS
Chart.register(Tooltip, Legend, ArcElement);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '50%', // Tamaño del agujero en el centro de la dona
  plugins: {
    legend: {
      display: false // Oculta la leyenda
    },
    tooltip: {
      enabled: false // Desactiva los tooltips
    },
    // Plugin para mostrar texto en el centro
    centerText: {
      display: true,
      text: '120' // Asumiendo 120 personas activas, ajusta según los datos reales
    }
  }
};

const data = {
  labels: ['Personas Activas'],
  datasets: [
    {
      label: 'Personas Activas',
      data: [120, 80], // 120 activas de 200 total, ajusta según datos reales
      backgroundColor: ['rgba(138, 43, 226, 0.8)'], // Color rojo vino
      borderColor: ['rgba(138, 43, 226, 1)'],
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
