import express, { Router } from 'express';
import JumpsController from '../controllers/JumpsController';

const router = Router();
const controller = new JumpsController();

router.get('/', controller.get);

export default router;