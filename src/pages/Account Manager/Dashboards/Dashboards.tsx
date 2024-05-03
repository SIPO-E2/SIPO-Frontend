import React from 'react';
import LineChar from './LineChar';
import BarChar from './BarChar'; // Importa el nuevo componente BarChar

const cardContainerClasses = "grid grid-cols-1 md:grid-cols-2 gap-6";
const cardClasses = "bg-white shadow rounded-lg p-4";
const flexClasses = "flex justify-between items-center";
const textClasses = "text-lg font-semibold text-zinc-900";
const subTextClasses = "text-sm text-zinc-500";

interface ChartCardProps {
    title: string;
    children?: React.ReactNode;  // Asegúrate de que children es opcional
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
    return (
        <div className={cardClasses}>
            <div className={flexClasses + " mb-4"}>
                <h2 className={textClasses}>{title}</h2>
                <span className={subTextClasses}></span>
            </div>
            {children} 
        </div>
    );
};

interface DataCardProps {
    title: string;
    value: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value }) => {
    return (
        <div className={cardClasses + " flex justify-between items-center"}>
            <div>
                <h3 className={textClasses}>{title}</h3>
                <p className="text-3xl font-semibold text-zinc-900">{value}</p>
                <p className={"text-sm"}></p>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={cardContainerClasses}>
                <ChartCard title="Project Billing Rate Trends">
                    <LineChar />
                </ChartCard>
                <ChartCard title="Openings & Job Positions per division">
                    <BarChar /> 
                </ChartCard>
                <ChartCard title="Number of Active Projects per Client">
                    <LineChar />
                </ChartCard>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DataCard title="Active Clients" value="200" />
                    <DataCard title="Active Openings" value="96" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
