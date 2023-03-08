import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Topology from '../models/Topology';

const createTopology = (req: Request, res: Response, next: NextFunction) => {
    const topology = new Topology({
        _id: new mongoose.Types.ObjectId(),
        timestamp: new Date(),
        ...req.body
    });

    return topology
        .save()
        .then((Topology) => {
            res.status(201).json({ Topology });
        })
        .catch((error) => res.status(500).json({ error }));
};

const readTopology = (req: Request, res: Response, next: NextFunction) => {
    const TopologyId = req.params.TopologyId;

    return Topology.findById(TopologyId)
        .then((topology) => (topology ? res.status(200).json({ topology }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Topology.find()
        .then((Topologys) => res.status(200).json({ Topologys }))
        .catch((error) => res.status(500).json({ error }));
};

const updateTopology = (req: Request, res: Response, next: NextFunction) => {
    const TopologyId = req.params.TopologyId;

    return Topology.findById(TopologyId)
        .then((topology) => {
            if (topology) {
                topology.set(req.body);

                return topology
                    .save()
                    .then((topology) => res.status(201).json({ topology }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteTopology = (req: Request, res: Response, next: NextFunction) => {
    const TopologyId = req.params.TopologyId;

    return Topology.findByIdAndDelete(TopologyId)
        .then((topology) => (topology ? res.status(201).json({ topology, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createTopology, readTopology, readAll, updateTopology, deleteTopology };
