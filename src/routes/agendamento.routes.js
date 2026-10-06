import express from 'express'
import AgendamentosController from '../controllers/agendamentos.controller.js';
const router = express.Router();


router.post('/', AgendamentosController.agendarServiço )

export default router