import express from 'express';
import controller from '../controllers/Topology';

const router = express.Router();

router.post('/', controller.createTopology);
router.get('/:TopologyId', controller.readTopology);
router.get('/', controller.readAll);
router.patch('/:TopologyId', controller.updateTopology);
router.delete('/:TopologyId', controller.deleteTopology);

export = router;
