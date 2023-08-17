import express, { Router } from 'express';
import UsersController from '../controllers/UsersController';
import auth from '../middleware/auth';
const router = Router();
const controller = new UsersController();

router.get('/', auth, controller.get);

export default router;