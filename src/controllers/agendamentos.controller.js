import agendamentosModel from "../models/agendamentos.model.js"

const AgendamentosController = {
    agendarServiço: async (req, res) => {
        const { servicos, data_marcada, horario, preco_total, tempoTotal } = req.body

        if(!servicos || !data_marcada || !horario || !preco_total){
            return res.status(400).json({
                mensagem: 'Dados importantes faltando'
            })
        }

        try {
            const novoAgendamento = await agendamentosModel.criarAgendamento(servicos, data_marcada, horario, preco_total, tempoTotal)

            
            return res.status(201).json({
               mensagem: 'Agendamento feito com sucesso',
               dados: novoAgendamento
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
              mensagem: 'Erro ao confirmar agendamento'
         })
        }
        
    }
}

export default AgendamentosController