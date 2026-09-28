import express from 'express'
import pool from '../database/db.js'

const router = express.Router();


router.post('/', async (req, res) => {

    const { servicos, data_marcada, horario, preco_total, tempoTotal } = req.body
    const servicos_id = servicos.map((servico) => servico.id)
    

    if(!servicos || !data_marcada || !horario || !preco_total){
        return res.status(400).json({
            mensagem: 'Dados importantes faltando'
        })
    }

     try {
        const SQLagendamentos = 'INSERT INTO agendamentos (data_marcada, horario, preco_total, tempo_total) VALUES ($1, $2, $3, $4) RETURNING *'
        const resultado = await pool.query(SQLagendamentos, [data_marcada, horario, preco_total, tempoTotal])
        const novoAgendamento = resultado.rows[0].id

        for(const servicoID of servicos_id) {
            const SQLservicos = 'INSERT INTO agendamentos_servicos (agendamento_id, servico_id, data_agendamento) VALUES ($1, $2, $3)' 
            await pool.query(SQLservicos, [novoAgendamento, servicoID, data_marcada])

        }
        
        console.log(servicos_id)
        console.log(servicos) // definir qual o serviço, sem preço, somente o id e o nome do serviço | USO DE DESESTRUTURAÇÃO
        console.log(data_marcada) // definir a data no banco de dados | MANDA DIRETO PRO BANCO
        console.log(horario) // definir o horario do banco de dados MANDA DIRETO PRO BANCO
        console.log(preco_total) // vai ser usado pra definir um valor do servico no banco de dados | MANDA DIRETO PRO BANCO
        console.log(tempoTotal) // vai ser usado pra definir o tempo total do serviço completo | MANDA DIRETO PRO BANCO
        return res.status(201).json({
            mensagem: 'Agendamento feito com sucesso',
            dados: resultado.rows[0]
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            mensagem: 'Erro ao confirmar agendamento'
        })
    }
})

export default router