import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleCollectors } from '../library/Metrics';
import TelemetryReport from '../models/TelemetryReport';

const createTelemetryReport = (req: Request, res: Response, next: NextFunction) => {
    const telemetryReport = new TelemetryReport({
        _id: new mongoose.Types.ObjectId(),
        timestamp: new Date(),
        ...req.body
    });

    return telemetryReport
        .save()
        .then((TelemetryReport) => {
            handleCollectors(TelemetryReport);
            res.status(201).json({ TelemetryReport });
        })
        .catch((error) => res.status(500).json({ error }));
};

const readTelemetryReport = (req: Request, res: Response, next: NextFunction) => {
    const TelemetryReportId = req.params.TelemetryReportId;

    return TelemetryReport.findById(TelemetryReportId)
        .then((telemetryReport) => (telemetryReport ? res.status(200).json({ telemetryReport }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return TelemetryReport.find()
        .then((TelemetryReports) => res.status(200).json({ TelemetryReports }))
        .catch((error) => res.status(500).json({ error }));
};

const updateTelemetryReport = (req: Request, res: Response, next: NextFunction) => {
    const TelemetryReportId = req.params.TelemetryReportId;

    return TelemetryReport.findById(TelemetryReportId)
        .then((telemetryReport) => {
            if (telemetryReport) {
                telemetryReport.set(req.body);

                return telemetryReport
                    .save()
                    .then((telemetryReport) => res.status(201).json({ telemetryReport }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteTelemetryReport = (req: Request, res: Response, next: NextFunction) => {
    const TelemetryReportId = req.params.TelemetryReportId;

    return TelemetryReport.findByIdAndDelete(TelemetryReportId)
        .then((telemetryReport) => (telemetryReport ? res.status(201).json({ telemetryReport, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createTelemetryReport, readTelemetryReport, readAll, updateTelemetryReport, deleteTelemetryReport };
