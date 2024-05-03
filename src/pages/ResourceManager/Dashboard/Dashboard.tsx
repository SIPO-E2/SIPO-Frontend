import React from 'react';

const chartCardClasses = 'bg-white shadow rounded-lg p-4';
const chartTitleClasses = 'font-bold text-lg';
const chartDescriptionClasses = 'text-sm text-zinc-600 mt-2';

interface ChartCardProps {
    title: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title }) => {
    return (
        <div className={chartCardClasses}>
            <h2 className={chartTitleClasses}>{title}</h2>
            {<p className={chartDescriptionClasses}></p>}
        </div>
    );
};

const Dashboard: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ChartCard
                    title="Job Grade"
                />
                <ChartCard
                    title="Years of Experience"
                />
                <ChartCard
                    title="Skills Statistics"
                />
                <ChartCard
                    title="Active Bench Candidate"
                />
                <ChartCard
                    title="Active Pipeline Candidates"
                />
                <ChartCard
                    title="Active Billing Candidates"
                />
                <ChartCard
                    title="Employee Gender Composition"
                />
                <ChartCard
                    title="Salary Distribution"
                />
                <ChartCard
                    title="Comparison of vacancies of the month"
                />
            </div>
        </div>
    );
};

export default Dashboard;
