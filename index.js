const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const moment = require('moment')
const db = require('./database.js')


const crypto = require('crypto')

app.set('view engine', 'ejs')

//logs url requested with time/date in console
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next()
}

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const data = require('./data.js')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.get('/users', (req, res) => {
    res.render('pages/listUsers', {
        users: data.users
    })
})

app.get('/users/new', (req, res) => {
    res.render('pages/newUser')
})

app.get('/users/new', (req, res) => {
    res.render('pages/listUsers', {
        users: [data.users[req.params.user_id]]
    })
})

app.post('/users/new', (req, res) => {
    req.body.password = crypto.createHash('sha256').update(req.body.password).digest('base64')
    data.users.push(req.body)
    res.redirect('/users')
})

app.get('/users/:user_id', (req, res) => {
    res.render('pages/listUsers', {
        users: [data.users[req.params.user_id]]
    })
})

app.get('/schedules', (req, res) => {
    console.log(data.schedules)
    res.render('pages/listSchedules', {
        schedules: data.schedules
    })
})

app.get('/users/:user_id/schedules', (req, res) => {
    let list = []
    for (let i = 0; i < data.schedules.length; i++) {
        if (data.schedules[i].user_id == req.params.user_id) {
            list.push(data.schedules[i])
        }
    }
    res.render('pages/listSchedules', {
        schedules: list
    })
})

app.get('/schedules/new', (req, res) => {
    res.render('pages/newSchedule')
})

app.post('/schedules/new', (req, res) => {
    req.body.user_id = Number(req.body.user_id)
    req.body.day = Number(req.body.day)
    data.schedules.push(req.body)
    res.redirect('/schedules')
})

app.listen(3000, () => console.log(`App listening at http://localhost:${PORT}`))