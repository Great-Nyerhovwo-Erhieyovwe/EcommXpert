// Simulate DB access with your preferred DB (Postgres, Mongo, etc.)
import User from '../models/User.js';
import Course from '../models/Course.js';
import InvestmentPool from '../models/InvestmentPool.js';
import WithdrawalRequest from '../models/WithdrawalRequest.js';
import NotificationTemplate from '../models/NotificationTemplate.js';
import PlatformMetric from '../models/PlatformMetric.js';
import db from '../db'; // Your DB client

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user profile
        const user = await db.users.findOne({ id: userId });

        // Fetch courses, investments, transactions
        const courses = await db.courses.find({ userId });
        const investments = await db.investments.find({ userId });
        const transactions = await db.transactions.find({ userId });

        res.json({
            user,
            courses,
            investments,
            transactions,
            balance: user.balance,
            totalEarnings: user.totalEarnings,
            totalInvested: user.totalInvested,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching dashboard data' });
    }
};