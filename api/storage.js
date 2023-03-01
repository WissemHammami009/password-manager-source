var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const crypto = require('crypto')
var nodemailer = require('nodemailer');
const {crypt,decrypt} = require('../crypt')
router.use(bodyParser.json());

const Storage = require('../models/storage');


router.get('/home', function(req, res, next) { 
    res.json( {connection:{status:"OK",
    message:"Welcome to You in Home Page"}});
});


router.post('/add',async (req,res)=>{
    let id = crypto.randomBytes(10).toString('hex')
    req.body.id = id
    password = req.body.password
    delete req.body.password
    password_crypt = password;
    req.body.password = crypt(password_crypt)
    const item = new Storage(req.body)
    
    item.save()
    .then(resp=>{
        res.json({added:{item:"yes"}})
    })
    .catch(err=>{
        res.json({added:{item:"no"}})
        console.log(err.message)
    })
})

router.patch('/modify',(req,res)=>{
    console.log(req.body)
    id = req.body.id
    delete req.body.id
    password = req.body.password 
    delete req.body.password
    password_crypt = password
    req.body.password = crypt(password_crypt)
    console.log(req.body)
    const update  = Storage.updateOne({id:id},{$set: req.body}).then(resp=>{
        console.log(resp)
        if(resp.matchedCount == 0){
            res.json({data:{update:"no"}})
        }
        else {
            res.json({data:{update:"yes"}})
        }
    })
})


router.post('/delete',(req,res)=>{
    id = req.body.id;
    const data_to_delete = Storage.deleteOne({id:id}).then(resp=> {
        if (resp == null ){
            return res.json({data:{delete:"no"}})
        }
        else if(resp.deletedCount == 0){
            res.json({data:{delete:"no"}})
        }
        else (
            res.json({data:{delete:"yes"}})
        )
    })
})

router.post('/items_get',(req,res)=>{
    const data = {
        author_id:req.body.author_id
    }

const getdata = Storage.find(data)
.then(resp=>{
    if (resp == null) {
        return res.json(
            {data:{exist:'no'}
        })
    }
    else {
        res.json({data:{ exist:'yes',items: resp}})
    }
    
    
})
.catch(err=>{
    res.send(err)
})
})

router.post('/showpassword',(req,res)=>{
    let password = req.body.password
    password_decrypt = decrypt(password) 
    res.status(200).json({password:password_decrypt})
})


module.exports = router;


