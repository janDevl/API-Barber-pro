import express from 'express'
import AgendamentosController from '../controllers/agendamentos.controller.js';
const router = express.Router();

router.post('/', AgendamentosController.agendarServiço)
router.delete('/:id', AgendamentosController.deletarAgendamento)
router.put('/:id', AgendamentosController.attAgendamento)

export default router