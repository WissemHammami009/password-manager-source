const express = require('express')

const mongodb = require('mongoose')

const crypto = require('crypto')
userroute = require('./api/user')
storageroute = require('./api/storage')
const app = express()
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host:"smtp.gmail.com",
    auth: {
      user: '',
      pass: ''
    }
  });

app.use(bodyParser.json());


app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/',(req,res)=>{
    res.sendFile('./views/index.html',{root:__dirname})
})
app.use('/api/user/',userroute);
app.use('/api/storage/',storageroute);

app.listen('3000',()=>{
    console.log('server running !!')
})
app.get('/get',(req,res)=>{
    res.send("ok")
})
