import express, { Router } from 'express';
import JumpsController from '../controllers/JumpsController';
import auth from '../middleware/auth';

const router = Router();
const controller = new JumpsController();

// public jump routes
router.get('/', controller.get);

// private jump routes
router.post('/', auth, controller.post);

export default router;