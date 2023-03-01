
const mongo = require('mongoose')

const Storage = mongo.Schema({
    id: {
        type:String,
        required: true
    },
    name: {
        type:String
    },
    link: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    author_id :{
        type:String,
        required: true
    }  
})

module.exports = mongo.model('storage',Storage,"storage")