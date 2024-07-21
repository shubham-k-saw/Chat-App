import dotenv from 'dotenv'
import app from './app.js'
import { connectMongo } from './db/mongo.js'
dotenv.config()

const PORT = process.env.PORT || 3001

const server = async () => {
  try {
    await connectMongo()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} ⚡`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

server()
