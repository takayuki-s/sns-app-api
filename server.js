const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const PORT = 8000

const prisma = new PrismaClient()

app.use(express.json())

// 新規ユーザー登録API
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  })

  return res.json({ user })
})

app.get('/', (req, res) => {
  console.log(req)
  res.send('<h1>hello</h1>')
})

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`))
