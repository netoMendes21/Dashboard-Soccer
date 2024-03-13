import { Router } from 'express';
import UserMiddleware from '../middlewares/userMiddleware';
import UsersController from '../controller/UsersController';

const usersController = new UsersController();
// const userMiddleware = new UserMiddleware();

const router = Router();

router.post(
  '/',
  UserMiddleware.validatorLogin,
  (req, res) => usersController.getUser(req, res),
);

// router.post(
//   '/role',
//   (req, res) => UserMiddleware.validateToken(req, res),
// );

// router.post('login/role', (req, res) => usersController.getUserRole(req, res));

export default router;
