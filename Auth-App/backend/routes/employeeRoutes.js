import express from 'express';
import { createEmployee, getAllEmployees, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createEmployee);
router.get('/', authMiddleware, getAllEmployees);
router.put('/:id', authMiddleware, updateEmployee);
router.delete('/:id', authMiddleware, deleteEmployee);

export default router;
