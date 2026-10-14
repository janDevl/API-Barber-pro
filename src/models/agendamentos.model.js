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

    async conflitoHorarios(data_marcada, horario, tempoTotal){
        const queryText = `SELECT 1 FROM agendamentos WHERE data_marcada = $1 AND $2 < (horario +  (tempo_total || ' minutes')::INTERVAL) AND ($2 + ($3 || ' minutes')::INTERVAL) > horario`

        const { rows } = await pool.query(queryText, [data_marcada, horario, tempoTotal])
        
        return rows.length > 0;
    }

    async deletarAgendamento(id) {
        const queryText = 'DELETE FROM agendamentos WHERE id = $1 RETURNING *'

        const { rows } = await pool.query(queryText, [id])

        return rows[0]
    }

    async atualizarAgendamento(data_marcada, horario, id) {
        const queryText = `
          UPDATE agendamentos
          SET 
            data_marcada = COALESCE($1, data_marcada),
            horario = COALESCE($2, horario)
            WHERE id = $3
            RETURNING *
        `;

        const { rows } = await pool.query(queryText, [data_marcada, horario, id])

        return rows[0]
    }
}

export default new AgendamentoModel