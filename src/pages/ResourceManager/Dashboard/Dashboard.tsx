import React from 'react';
import PieChar from './PieChar';  // Asegúrate de que la ruta es correcta
import BarChar from './BarChar';  // Importa el componente BarChar

const chartCardClasses = 'bg-white shadow rounded-lg p-4';
const chartTitleClasses = 'font-bold text-lg';
const chartDescriptionClasses = 'text-sm text-zinc-600 mt-2';

interface ChartCardProps {
    title: string;
    children?: React.ReactNode;  // Permite la inserción de componentes hijos
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
    return (
        <div className={chartCardClasses}>
            <h2 className={chartTitleClasses}>{title}</h2>
            {children} 
        </div>
    );
};

const Dashboard: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ChartCard title="Job Grade">
                    <PieChar /> 
                </ChartCard>
                <ChartCard title="Years of Experience">
                    <BarChar /> 
                </ChartCard>
                <ChartCard title="Skills Statistics" />
                <ChartCard title="Active Bench Candidate" />
                <ChartCard title="Active Pipeline Candidates" />
                <ChartCard title="Active Billing Candidates" />
                <ChartCard title="Employee Gender Composition" />
                <ChartCard title="Salary Distribution" />
                <ChartCard title="Comparison of vacancies of the month" />
            </div>
        </div>
    );
};

export default Dashboard;
