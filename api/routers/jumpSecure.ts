import express, { Router } from 'express';
import JumpsController from '../controllers/JumpsController';

const router = Router();
const controller = new JumpsController();

router.post('/', controller.post);

export default router;