import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

// Registrando componentes para Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Opciones para chart.js
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart with Multiple Datasets',
        },
    },
};

// Títulos del eje X
const labels = ["January", "February", "March", "April", "May", "June", "July"];

// Data para el gráfico
const data = {
    labels,
    datasets: [
        {
            label: '1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)', // Red
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: '2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)', // Blue
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: '3',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(75, 192, 192)', // Green
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }
    ],
};

// El componente funcional de Linechar
export default function Linechar() {
    return <Line options={options} data={data} />;
}
