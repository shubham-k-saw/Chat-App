import express from 'express'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/userRoute.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/status', (req, res) => {
  return res.status(200).send({ message: 'Server is running' })
})

app.use('/api/v1', userRouter)

export default app
