import React from 'react';
import PieChar from './PieChar';
import BarChar from './BarChar';
import HorizontalBarChar from './HorizontalBarChar';
import DoughnutChar from './DoughnutChar';
import DoughnutChar2 from './DoughnutChar2';
import DoughnutChar3 from './DoughnutChar3';
import PieChar2 from './PieChar2';
import LineChar from './LineChar';
import BarChar2 from './BarChar2';  // Importa el nuevo componente BarChar2

const chartCardClasses = 'bg-white shadow rounded-lg p-4';
const chartTitleClasses = 'font-bold text-lg';
const chartDescriptionClasses = 'text-sm text-zinc-600 mt-2';

interface ChartCardProps {
    title: string;
    children?: React.ReactNode;
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
                <ChartCard title="Skills Statistics">
                    <HorizontalBarChar /> 
                </ChartCard>
                <ChartCard title="Active Bench Candidate">
                    <DoughnutChar /> 
                </ChartCard>
                <ChartCard title="Active Pipeline Candidates">
                    <DoughnutChar2 /> 
                </ChartCard>
                <ChartCard title="Active Billing Candidates">
                    <DoughnutChar3 />
                </ChartCard>
                <ChartCard title="Employee Gender Composition">
                    <PieChar2 /> 
                </ChartCard>
                <ChartCard title="Salary Distribution">
                    <LineChar />  
                </ChartCard>
                <ChartCard title="Comparison of vacancies of the month">
                    <BarChar2 /> 
                </ChartCard>
            </div>
        </div>
    );
};

export default Dashboard;
