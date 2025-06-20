import express from 'express';
import { getPlatforms, connectPlatform, disconnectPlatform } from '../controllers/platformController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(auth);

router.get('/', getPlatforms);
router.post('/connect', connectPlatform);
router.post('/disconnect', disconnectPlatform);

export default router;
