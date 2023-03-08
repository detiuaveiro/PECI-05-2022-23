import { NextFunction, Request, Response } from 'express';
import { register } from '../library/Metrics';

const getMetrics = async (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Content-type', register.contentType);
    res.end(await register.metrics());
};

export default { getMetrics };
