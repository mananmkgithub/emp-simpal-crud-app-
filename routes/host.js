const express=require('express')
const host=express.Router()

const hostcontroller=require('../controllers/hostcontroller')

host.get('/alldata',hostcontroller.alldata)
host.get('/',hostcontroller.gethome)
host.get('/contact',hostcontroller.getcontactpage)
host.post('/crud',hostcontroller.postcrud)
host.post('/edit',hostcontroller.posteditemp)
host.get('/edit/:Id',hostcontroller.geteditemp)
host.get('/delete/:Id',hostcontroller.getdelete)
host.post('/contact',hostcontroller.postontactpage)
host.post('/search',hostcontroller.getsearch)

module.exports=host
