const express = require('express')
const app = express()
const host = require('./routes/host')
require('dotenv').config()
const mongoose = require('mongoose')
const Mongo_Url = process.env.DB_URL
const emp=require('./model/emp')
const hostcontroller=require('./controllers/hostcontroller')
app.use(express.urlencoded())
app.set('view engine', 'ejs')
app.set('views', 'views')

app.get('/',hostcontroller.home)
app.use("/host", host)

app.use((req, res, next) => {
    res.render('404')
})

const PORT = process.env.PORT || 5000
mongoose.connect(Mongo_Url).then(() => {
    app.listen(PORT, () => {
        console.log('Connect To Mongodb...')
        console.log(`http://localhost:${PORT}`)
    })
}).catch((er) => {
    console.log("Not Coonect To Mongo db", er)
})
