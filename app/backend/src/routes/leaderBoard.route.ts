import { Router } from 'express';
import LeaderController from '../controller/LeaderController';

const router = Router();
const leaderBoardController = new LeaderController();
router.get('/home', (req, res) => leaderBoardController.ResponseLeaderBoardHome(req, res));

export default router;
