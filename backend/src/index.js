const express = require('express')
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })
require('./config/db')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

app.use(express.json())

const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/tasks')

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})