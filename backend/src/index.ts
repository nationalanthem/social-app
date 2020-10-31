import { config } from 'dotenv'
config()

import express from 'express'
import { connectToDB } from './database'
import { passport } from './passport'

import { userController } from './controllers/User.controller'
import { registerValidation } from './validations/register.validation'

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(passport.initialize())

app.get('/me', passport.authenticate('jwt'), userController.ownProfile)
app.post('/register', registerValidation, userController.register)
app.post('/login', passport.authenticate('local'), userController.login)

connectToDB()
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})
