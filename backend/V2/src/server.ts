import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import TelemetryReportRoutes from './routes/TelemetryReport';
import TopologyRoutes from './routes/Topology';
import MetricsRoutes from './routes/Metrics';

const router = express();

mongoose
    .connect(config.mongo.url, { w: 'majority', retryWrites: true })
    .then(() => {
        Logging.info('connected to mongoose');
        StartServer();
    })
    .catch((error) => {
        Logging.error(error);
    });

const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of our API */
    router.use((req, res, next) => {
        //res.header('Access-Control-Allow-Origin', '*');
        //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    /** Routes */
    router.use('/api/TelemetryReport', TelemetryReportRoutes);
    router.use('/api/Topology', TopologyRoutes);
    router.use('/metrics', MetricsRoutes);

    /** Healthcheck */
    router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    //http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
    router.listen(config.server.port, '192.168.1.105', () => Logging.info(`Server is running on port ${config.server.port}`));
};
