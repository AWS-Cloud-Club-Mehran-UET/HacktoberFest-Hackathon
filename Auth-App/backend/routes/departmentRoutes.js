import express from 'express';
import { createDepartment, getAllDepartments, updateDepartment, deleteDepartment } from '../controllers/departmentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createDepartment);
router.get('/', authMiddleware, getAllDepartments);
router.put('/:id', authMiddleware, updateDepartment);
router.delete('/:id', authMiddleware, deleteDepartment);

export default router;
