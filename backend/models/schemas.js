const mongoose = required('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    email: {type:String, required:true},
})

const Users = mongoose.model('Users', userSchema, 'users')
const mySchemas = {'Users':Users}

module.exports = mySchemas