import db from '../db';
import User from '../models/User.js';
import Course from '../models/Course.js';
import InvestmentPool from '../models/InvestmentPool.js';
import WithdrawalRequest from '../models/WithdrawalRequest.js';
import NotificationTemplate from '../models/NotificationTemplate.js';
import PlatformMetric from '../models/PlatformMetric.js';

// Fetch all admin data
export const getAdminData = async (req, res) => {
    try {
        const users = await db.users.find({});
        const courses = await db.courses.find({});
        const investmentPools = await db.investmentPools.find({});
        const withdrawalRequests = await db.withdrawalRequests.find({});
        const notifications = await db.notificationTemplates.find({});
        const metrics = await db.platformMetrics.findOne({}); // Assume single doc

        res.json({
            users,
            courses,
            investmentPools,
            withdrawalRequests,
            notificationTemplates: notifications,
            metrics,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching admin data' });
    }
};

// Update user (admin)
export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await db.users.update({ id: userId }, updates);
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user' });
    }
};

// Resolve withdrawal
export const resolveWithdrawal = async (req, res) => {
    const { requestId } = req.params;
    const { resolution } = req.body;

    try {
        const updatedRequest = await db.withdrawalRequests.update(
            { id: requestId },
            { status: resolution, processedAt: new Date() }
        );
        res.json(updatedRequest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error resolving withdrawal' });
    }
};