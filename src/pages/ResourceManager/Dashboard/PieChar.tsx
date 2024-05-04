import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(Tooltip, Legend, ArcElement);

const data = {
  labels: ['C1', 'C2', 'C3'],
  datasets: [
    {
      label: '# of Votes',
      data: [faker.datatype.number({ min: 50, max: 200 }), faker.datatype.number({ min: 50, max: 200 }), faker.datatype.number({ min: 50, max: 200 })],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)', // verde
        'rgba(255, 99, 132, 0.5)', // rojo
        'rgba(54, 162, 235, 0.5)'  // azul
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChar() {
  return <Pie data={data} />;
}
