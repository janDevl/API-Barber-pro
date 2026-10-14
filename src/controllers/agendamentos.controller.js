import agendamentosModel from "../models/agendamentos.model.js"

const AgendamentosController = {
    // em desenvolvimento
    horariosDisponiveis: async (req, res) => {
        
    },

    agendarServiço: async (req, res) => {
        const { servicos, data_marcada, horario, preco_total, tempoTotal } = req.body

        if(!servicos || !data_marcada || !horario || !preco_total){
            return res.status(400).json({
                mensagem: 'Dados importantes faltando'
            })
        }

        
        try {
            const horarioConflito = await agendamentosModel.conflitoHorarios(data_marcada, horario, tempoTotal)

            if(horarioConflito) {
                return res.status(400).json({
                    mensagem: "Horario indisponivel ou colide com outro agendamento"
                })
            }

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
        
    },

    deletarAgendamento: async (req, res) => {
        const { id } = req.params
        
        if(!id) {
            return res.status(400).json({
                mensagem: 'Id precisa ser especificado'
            })
        }
        
        try {
            const resultado = await agendamentosModel.deletarAgendamento(id)

            if(!resultado){
                return res.status(404).json({
                    mensagem: 'Agendamento não existe'
                })
            }

            return res.status(200).json({
                mensagem: 'Agendamento apagado com sucesso',
                agendamento: resultado
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                mensagem: 'Erro ao apagar agendamento'
            })
        }
    },

    attAgendamento: async (req, res) => {
        const { id } = req.params
        
        const { data_marcada, horario } = req.body

        if(!id){
            return res.status(400).json({
                mensagem: 'Informe o id do agendamento'
            })
        }

        try {
            const atualizarAgendamento = await agendamentosModel.atualizarAgendamento(data_marcada, horario, id)

            if(!atualizarAgendamento){
                 return res.status(404).json({
                    mensagem: 'Agendamento não encontrado pra atualizar'
                })
            }

            return res.status(201).json({
                mensagem: 'Agendamento atualizado com sucesso',
                agendamento: atualizarAgendamento
            })

        } catch (error) {
            console.log(error)

            return res.status(500).json({
                mensagem: 'Erro ao atualizar agendamento'
            })
        }
    }

}

export default AgendamentosController