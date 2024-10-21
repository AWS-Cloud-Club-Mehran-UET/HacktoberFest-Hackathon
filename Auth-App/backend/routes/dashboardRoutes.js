import express from 'express';
import { Employee } from '../models/employee.js';
import { Query } from '../models/queryModel.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get dashboard metrics (Protected)
router.get('/metrics', authMiddleware, async (req, res) => {
    const totalEmployees = await Employee.countDocuments();
    const pendingQueries = await Query.countDocuments({ status: 'open' });

    res.json({
        totalEmployees,
        pendingQueries,
    });
});

export default router;
