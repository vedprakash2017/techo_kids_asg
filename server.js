// const express = require('express')
// const app = express()

// require('dotenv').config()
// const mongoose = require('mongoose')

// mongoose.connect(process.env.DATABASE_URL , {useNewUrlParser: true});

// const db = mongoose.connection
// db.once('open',()=>console.log(" oh yeah "))


// // console.log(db.vedu.find())
// app.listen(3000, ()=> console.log('Go Go'))


require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const mainRoute = require('./routes/mainRoute')
app.use('/product', mainRoute)

app.listen(3000, () => console.log('Server Started'))