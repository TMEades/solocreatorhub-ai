import express from 'express';
import { getAnalytics, getOptimalTimes } from '../controllers/analyticsController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(auth);

router.get('/', getAnalytics);
router.get('/optimal-times', getOptimalTimes);

export default router;
