import express from 'express';
import { submitQuery, getQueries, updateQuery } from '../controllers/queryController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Submit a query (Protected)
router.post('/', authMiddleware, submitQuery);

// Get all queries (Protected)
router.get('/', authMiddleware, getQueries);

// Update query status (Protected)
router.put('/:id', authMiddleware, updateQuery);

export default router;
