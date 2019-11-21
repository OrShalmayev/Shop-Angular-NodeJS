const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:Number, required:true, default: 1},
    created_at:{type:Date, default:Date.now},
    updated_at:{type:Date, default:Date.now}
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;