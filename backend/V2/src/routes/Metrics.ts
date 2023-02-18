import express from 'express';
import controller from '../controllers/Metrics';

const router = express.Router();

router.get('/target', controller.getMetrics);

export = router;
