import { Router } from 'express';
import teamRouter from './team.route';
import loginRouter from './login.route';
import matchesRouter from './matches.route';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);

export default router;
