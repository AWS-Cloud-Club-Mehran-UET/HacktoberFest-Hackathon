import express from 'express';
import { createOnboardingTask, getOnboardingTasks, updateOnboardingStatus } from '../controllers/onboardingController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create onboarding tasks (Protected)
router.post('/', authMiddleware, createOnboardingTask);

// Get onboarding tasks (Protected)
router.get('/', authMiddleware, getOnboardingTasks);

// Update onboarding status (Protected)
router.put('/:id', authMiddleware, updateOnboardingStatus);

export default router;
