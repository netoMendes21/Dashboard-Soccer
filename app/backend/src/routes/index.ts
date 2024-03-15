import { Router } from 'express';
import teamRouter from './team.route';
import loginRouter from './login.route';
import matchesRouter from './matches.route';
import leaderBoardRouter from './leaderBoard.route';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);
export default router;
