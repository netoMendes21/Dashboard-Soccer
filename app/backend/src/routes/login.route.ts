import { Router } from 'express';
import UsersController from '../controller/UsersController';
import UserMiddleware from '../middleware/userMiddleware';

const usersController = new UsersController();
const userMiddleware = new UserMiddleware();

const router = Router();

router.post('/', userMiddleware. (req, res) => usersController.getUser(req, res));
// router.post('login/role', (req, res) => usersController.getUserRole(req, res));

export default router;
