import express from 'express';
import controller from '../controllers/TelemetryReport';

const router = express.Router();

router.post('/', controller.createTelemetryReport);
router.get('/:TelemetryReportId', controller.readTelemetryReport);
router.get('/', controller.readAll);
router.patch('/:TelemetryReportId', controller.updateTelemetryReport);
router.delete('/:TelemetryReportId', controller.deleteTelemetryReport);

export = router;
