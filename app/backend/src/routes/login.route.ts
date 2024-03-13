import { Router } from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import LoginController from '../controller/LoginController';

const loginController = new LoginController();
// const LoginMiddleware = new LoginMiddleware();

const router = Router();

router.post(
  '/',
  LoginMiddleware.validatorLogin,
  (req, res) => loginController.getUser(req, res),
);

router.get('/role', (req, res, next) => LoginMiddleware.validateToken(req, res, next));

export default router;
