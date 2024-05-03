import React from 'react';

const cardContainerClasses = "grid grid-cols-1 md:grid-cols-2 gap-6";
const cardClasses = "bg-white shadow rounded-lg p-4";
const flexClasses = "flex justify-between items-center";
const textClasses = "text-lg font-semibold text-zinc-900";
const subTextClasses = "text-sm text-zinc-500";

interface ChartCardProps {
    title: string;
    subTitle: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subTitle,  }) => {
    return (
        <div className={cardClasses}>
            <div className={flexClasses + " mb-4"}>
                <h2 className={textClasses}>{title}</h2>
                <span className={subTextClasses}>{subTitle}</span>
            </div>
        </div>
    );
};

interface DataCardProps {
    title: string;
    value: string;
    changePercentage: string;
    color: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, value, changePercentage, color }) => {
    return (
        <div className={cardClasses + " flex justify-between items-center"}>
            <div>
                <h3 className={textClasses}>{title}</h3>
                <p className="text-3xl font-semibold text-zinc-900">{value}</p>
                <p className={"text-sm " + color}>{changePercentage}</p>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={cardContainerClasses}>
                <ChartCard
                    title="Project Billing Rate Trends"
                    subTitle="+23% than last week"
                />
                <ChartCard
                    title="Openings & Job Positions per division"
                    subTitle="+90% more in 2024"

                />
                <ChartCard
                    title="Number of Active Projects per Client"
                    subTitle="+5% more in 2021"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DataCard
                        title="Active Clients"
                        value="200"
                        changePercentage="+25% than last month"
                        color="text-green-500"
                    />
                    <DataCard
                        title="Active Openings"
                        value="96"
                        changePercentage="-10% than last month"
                        color="text-red-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
