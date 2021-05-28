const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

const data = require('./data')

app.listen(3000, () => console.log(`App listening at http://localhost:${PORT}`))