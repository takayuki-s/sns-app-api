const express = require('express')
const app = express()

const PORT = 8000

app.get('/', (req, res) => {
  console.log(req)
  res.send('<h1>hello</h1>')
})

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`))
