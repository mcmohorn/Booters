import express, { Router } from 'express';
import AreasController from '../controllers/AreasController';

const router = Router();
const controller = new AreasController();

router.get('/', controller.get);

export default router;