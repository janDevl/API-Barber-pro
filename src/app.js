import express from 'express'
import AgendamentoRouter from './routes/agendamento.routes.js'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

app.use('/agendamento', AgendamentoRouter)

export default app