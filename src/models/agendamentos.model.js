import pool from '../database/db.js'


class AgendamentoModel {
    async criarAgendamento(servicos, data_marcada, horario, preco_total, tempoTotal) {
        const servicos_id = servicos.map((servico) => servico.id)

        const queryText = 'INSERT INTO agendamentos (data_marcada, horario, preco_total, tempo_total) VALUES ($1, $2, $3, $4) RETURNING *'

        const { rows } = await pool.query(queryText, [data_marcada, horario, preco_total, tempoTotal])

        const { id } = rows[0]

        for(const servicoID of servicos_id) {
             const SQLservicos = 'INSERT INTO agendamentos_servicos (agendamento_id, servico_id, data_agendamento) VALUES ($1, $2, $3)' 

                await pool.query(SQLservicos, [id, servicoID, data_marcada])

            }

        return rows[0]
    }
}

export default new AgendamentoModel