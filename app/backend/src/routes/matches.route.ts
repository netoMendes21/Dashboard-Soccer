import { Router } from 'express';
import MatchesController from '../controller/MatchesController';
import UserMiddleware from '../middlewares/LoginMiddleware';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req, res) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  UserMiddleware.validateToken,
  (req, res) => matchesController.matchFinish(req, res),
);

router.patch(
  '/:id',
  UserMiddleware.validateToken,
  (req, res) => matchesController.updateMatchGoals(req, res),
);

router.post(
  '/',
  UserMiddleware.validateToken,
  (req, res) => matchesController.insertMatch(req, res),
);

export default router;
