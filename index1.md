const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const saltRounds = 10
const db = require('./database')
const moment = require('moment')

const PORT = process.env.PORT || 3000

const data = require('./data')

const users = require('./data')



//logs url requested & time/date
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next()
}

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

//step 2
app.get('/', (req, res) => {
    res.send("Welcome to our schedule website")
})

app.get('/users', (req, res) => {
    res.send(data.users)
})

app.get('/schedules', (req, res) => {
    res.send(data.schedules)
})

//step 3
app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    res.send(data.users[id] ? data.users[id] : "User does not exist")
})


app.get('/users/:id/schedules', (req, res) => {
    const id = Number(req.params.id)
    let schedules = []

    for (let i = 0; i < data.schedules.length; i++) {
        const currentSchedule = data.schedules[i]
        if (currentSchedule.user_id === id) {
            schedules.push(currentSchedule)
        }
    }
    res.send(schedules)
})

//step 4
app.post('/schedules', (req, res) => {
    res.send(req.body)
})


app.post('/users', (req, res) => {
    res.send(req.body)
    const plainTextPassword = (req.body.password)

    const hash = bcrypt.hashSync(plainTextPassword, saltRounds);
    console.log(hash)

})

app.listen(3000, () => console.log(`App listening at http://localhost:${PORT}`))