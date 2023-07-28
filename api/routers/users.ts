import express, { Router } from 'express';
import UsersController from '../controllers/UsersController';

const router = Router();
const controller = new UsersController();

router.get('/', controller.get);

export default router;