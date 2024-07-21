import mongoose from 'mongoose'

const connectMongo = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.COLLECTION_NAME}`)
    console.log('MongoDB connected 🗄️')
  } catch (error) {
    console.log('MongoDB not connected')
    console.log(error)
    process.exit(1)
  }
}

export { connectMongo }
