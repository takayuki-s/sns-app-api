const express = require('express')
const app = express()
const authRoute = require('./routers/auth')
const postsRoute = require('./routers/posts')
const cors = require('cors')

require('dotenv').config()

const PORT = 8000

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`))
