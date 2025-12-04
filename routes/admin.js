import express from 'express';
import { authenticateToken, isAdmin } from './auth.js';
import {
    getAdminData,
    updateUser,
    resolveWithdrawal,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticateToken, isAdmin);

router.get('/', getAdminData);
router.put('/users/:userId', updateUser);
router.post('/withdrawals/:requestId/resolve', resolveWithdrawal);

export default router;