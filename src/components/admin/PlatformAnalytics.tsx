import React from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import Chart from 'chart.js/auto';

const PlatformAnalytics: React.FC = () => {
    const { state } = useAdmin();
    const revenueChartRef = React.useRef<HTMLCanvasElement>(null);
    const userGrowthChartRef = React.useRef<HTMLCanvasElement>(null);
    const [timeRange, setTimeRange] = React.useState('7d');

    React.useEffect(() => {
        if (revenueChartRef.current) {
            new Chart(revenueChartRef.current, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Revenue',
                            data: [1200, 1800, 2500, 3200, 4100, 4800, 5200],
                            borderColor: '#ec4899',
                            tension: 0.3,
                            fill: false,
                            borderWidth: 3,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { display: false } },
                    },
                },
            });
        }

        if (userGrowthChartRef.current) {
            new Chart(userGrowthChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
                    datasets: [
                        {
                            label: 'New Users',
                            data: [120, 180, 240, 320, 410, 480, 520, 580, 640, 720, 800],
                            backgroundColor: '#6366f1',
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                    },
                    scales: {
                        y: { beginAtZero: true, grid: { display: false } },
                    },
                },
            });
        }
    }, []);

    const metrics = [
        { title: 'Total Revenue', value: `$${state.metrics.monthlyRevenue.toLocaleString()}`, change: '+15%' },
        { title: 'User Growth', value: `${state.metrics.totalUsers.toLocaleString()}`, change: '+12%' },
        { title: 'Course Completion', value: '85%', change: '+3%' },
        { title: 'Investment ROI', value: '18%', change: '+2%' },
    ];

    return (
        <div className="platform-analytics">
            <div className="admin-header-actions">
                <h3>Platform Analytics</h3>
                <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="1y">Last Year</option>
                </select>
            </div>

            <div className="analytics-metrics">
                {metrics.map((metric, i) => (
                    <div key={i} className="metric-card">
                        <h3>{metric.title}</h3>
                        <p className="metric-value">{metric.value}</p>
                        <p className="metric-change">↑ {metric.change}</p>
                    </div>
                ))}
            </div>

            <div className="analytics-charts">
                <div className="chart-card">
                    <h3>Revenue Trend</h3>
                    <canvas ref={revenueChartRef} height="200"></canvas>
                </div>

                <div className="chart-card">
                    <h3>User Growth</h3>
                    <canvas ref={userGrowthChartRef} height="200"></canvas>
                </div>

                <div className="chart-card">
                    <h3>Course Performance</h3>
                    <div className="mini-chart">
                        <div className="mini-bar" style={{ height: '85%', backgroundColor: '#ec4899' }}>
                            <span>85%</span>
                        </div>
                        <div className="mini-bar" style={{ height: '72%', backgroundColor: '#8b5cf6' }}>
                            <span>72%</span>
                        </div>
                        <div className="mini-bar" style={{ height: '65%', backgroundColor: '#6366f1' }}>
                            <span>65%</span>
                        </div>
                    </div>
                    <div className="chart-legend">
                        <div><span style={{ backgroundColor: '#ec4899' }}></span> Beginner Courses</div>
                        <div><span style={{ backgroundColor: '#8b5cf6' }}></span> Intermediate Courses</div>
                        <div><span style={{ backgroundColor: '#6366f1' }}></span> Pro Courses</div>
                    </div>
                </div>

                <div className="chart-card">
                    <h3>Investment Performance</h3>
                    <div className="performance-grid">
                        <div className="performance-item">
                            <span>Starter Pool</span>
                            <span className="performance-value">+12%</span>
                        </div>
                        <div className="performance-item">
                            <span>Premium Pool</span>
                            <span className="performance-value">+22%</span>
                        </div>
                        <div className="performance-item">
                            <span>High-Risk Pool</span>
                            <span className="performance-value">+32%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="analytics-table">
                <h3>Top Performing Courses</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Enrolled</th>
                            <th>Completion</th>
                            <th>Revenue</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.courses.slice(0, 5).map(course => (
                            <tr key={course.id}>
                                <td>{course.title}</td>
                                <td>{course.enrolled.toLocaleString()}</td>
                                <td>{course.completionRate}%</td>
                                <td>${course.revenue.toLocaleString()}</td>
                                <td>4.8 ★</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlatformAnalytics;
