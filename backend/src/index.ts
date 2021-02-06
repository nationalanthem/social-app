import { config } from 'dotenv'
config()

import express from 'express'

import { connectToDB } from './database'
import { passport } from './passport'
import { initRoutes } from './routes'

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(passport.initialize())

initRoutes(app, passport)
connectToDB()

app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Server is running.')
  } else {
    console.log(`Listening at http://localhost:${PORT}`)
  }
})
