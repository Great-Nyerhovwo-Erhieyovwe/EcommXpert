import React from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import Chart from 'chart.js/auto';

const AnalyticsSection: React.FC = () => {
    useDashboard();
    const chartRef = React.useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = React.useRef<any>(null);

    React.useEffect(() => {
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            chartInstanceRef.current = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Revenue',
                            data: [1200, 1800, 2500, 3200, 4100, 4800],
                            borderColor: '#ec4899',
                            tension: 0.3,
                            fill: false,
                            borderWidth: 3,
                        },
                        {
                            label: 'ROI',
                            data: [8, 12, 15, 18, 20, 22],
                            borderColor: '#6366f1',
                            tension: 0.3,
                            fill: false,
                            borderWidth: 3,
                            yAxisID: 'y1',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' },
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { display: false } },
                        y1: {
                            position: 'right',
                            beginAtZero: true,
                            grid: { display: false },
                            ticks: { color: '#6366f1' },
                        },
                    },
                },
            });
        }
    }, []);

    return (
        <div className="analytics-section">
            <h2>Analytics</h2>

            <div className="analytics-grid">
                <div className="analytics-card">
                    <h3>Revenue</h3>
                    <canvas ref={chartRef} height="180"></canvas>
                </div>

                <div className="analytics-card">
                    <h3>Course Completion</h3>
                    <div className="metric-card">
                        <div className="metric-value">83%</div>
                        <div className="metric-label">of enrolled users</div>
                    </div>
                </div>

                <div className="analytics-card">
                    <h3>Customer Behavior</h3>
                    <div className="metric-card">
                        <div className="metric-value">3.2</div>
                        <div className="metric-label">Avg. time on store</div>
                    </div>
                </div>

                <div className="analytics-card">
                    <h3>Forecast</h3>
                    <div className="metric-card">
                        <div className="metric-value">$6,200</div>
                        <div className="metric-label">Next 30 days</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsSection;
