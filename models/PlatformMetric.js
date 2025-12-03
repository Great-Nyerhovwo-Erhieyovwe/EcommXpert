import mongoose from 'mongoose';

const platformMetricSchema = new mongoose.Schema({
    totalUsers: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    monthlyRevenue: { type: Number, default: 0 },
    totalCourses: { type: Number, default: 0 },
    totalInvestments: { type: Number, default: 0 },
    withdrawalRequests: { type: Number, default: 0 },
    systemStatus: { type: String, enum: ['operational', 'degraded', 'down'], default: 'operational' },
}, { timestamps: true });

export default mongoose.model('PlatformMetric', platformMetricSchema);