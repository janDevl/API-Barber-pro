import express from 'express'
import pool from '../database/db.js'

const router = express.Router();


router.post('/', async (req, res) => {

    const {servico_id, data_corte, horario, preco_total} = req.body
    const [dia, mes, ano] = data_corte.split('/')
    const data_sql = `${ano}-${mes}-${dia}`

    if(!servico_id || !data_sql || !horario || !preco_total){
        return res.status(400).json({
            mensagem: 'Dados importantes faltando'
        })
    }

    try {
        const comandoSQL = 'INSERT INTO agendamentos (servico_id, data_corte, horario, preco_total) VALUES ($1, $2, $3, $4) RETURNING *'
        const resultado = await pool.query(comandoSQL, [servico_id, data_sql, horario, preco_total])

        return res.status(201).json({
            mensagem: 'Agendamento feito com sucesso',
            dados: resultado.rows[0]
        })

    } catch (error) {
        console.log(error)
        return es.status(500).json({
            mensagem: 'Erro ao confirmar agendamento'
        })
    }
})

export default router