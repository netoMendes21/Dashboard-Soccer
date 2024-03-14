import { Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));

export default router;
