import mongoose, { Document, Schema } from 'mongoose';

export interface ITopology {
    network: string;
    timestamp: Date;
    data: any;
}

export interface ITopologyModel extends ITopology, Document {}

const TopologySchema: Schema = new Schema(
    {
        network: { type: String, required: true },
        timestamp: { type: Date, required: true },
        data: { type: Map }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ITopologyModel>('Topology', TopologySchema);
