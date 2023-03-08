import mongoose, { Document, Schema } from 'mongoose';

export interface ITelemetryReport {
    network: string;
    device: string;
    timestamp: Date;
    data: any;
}

export interface ITelemetryReportModel extends ITelemetryReport, Document {}

const TelemetryReportSchema: Schema = new Schema(
    {
        network: { type: String, required: true },
        device: { type: String, required: true },
        timestamp: { type: Date, required: true },
        data: { type: Map }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ITelemetryReportModel>('TelemetryReport', TelemetryReportSchema);
