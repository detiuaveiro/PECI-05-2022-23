import TelemetryReport, { ITelemetryReport } from '../models/TelemetryReport';
import client from 'prom-client';

export let register = new client.Registry();
register.setDefaultLabels({
    app: 'peci-backend'
});
client.collectDefaultMetrics({ register });
export let dataCollectors: Map<string, client.Gauge> = new Map();

export const getDeviceNames = async () => {
    return [...new Set((await TelemetryReport.find()).map((x) => x.device))];
};

export const getLatestInfoFromDevice = async (device: string): Promise<ITelemetryReport> => {
    return (await TelemetryReport.where((x: ITelemetryReport) => x.device == device)).reduce((a, b) => (a.timestamp > b.timestamp ? a : b));
};

export const handleCollectors = async (record: ITelemetryReport) => {
    for (const key of record.data.keys()) {
        handleCollector(record.device, key, Number(record.data.get(key)));
        console.log(record.data.get(key));
    }
};

const handleCollector = async (device: string, key: string, data: number) => {
    const colName = device + '_' + key;
    let collector = dataCollectors.get(colName);
    if (collector == undefined) {
        console.log(colName);
        let newCollector = new client.Gauge({
            name: device + '_' + key,
            help: `Device: ${device}, Metric: ${key}`
        });
        register.registerMetric(newCollector);
        newCollector.set(data);
        dataCollectors.set(colName, newCollector);
    } else {
        collector.set(data);
    }
};
