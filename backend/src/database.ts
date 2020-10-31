import mongoose from 'mongoose'

export const connectToDB = () => {
  if (process.env.MONGO_URI == null) {
    throw new Error('MongoDB URI string is not defined in .env config file')
  } else {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    mongoose.connection.on('error', (err) => {
      console.log('Failed to connect to DB', err)
    })
    mongoose.connection.once('open', () => {
      console.log('Connected to DB!')
    })
  }
}
