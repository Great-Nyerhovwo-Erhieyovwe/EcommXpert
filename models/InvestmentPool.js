import mongoose from 'mongoose';

const investmentPoolSchema = new mongoose.Schema({
    name: String,
    description: String,
    minDeposit: Number,
    roiRange: String,
    risk: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    status: { type: String, enum: ['active', 'paused', 'closed'], default: 'active' },
    totalInvested: { type: Number, default: 0 },
    investorCount: { type: Number, default: 0 },
    performance: [Number],
}, { timestamps: true });

export default mongoose.model('InvestmentPool', investmentPoolSchema);