const mongoose = require("mongoose");

const employee = mongoose.Schema({
    "name": { type: String, required: true },
    "email": { type: String, required: true ,unique: [true,'email is already exist..'] },
    "mobile": { type: String, required: true, unique: [true,'mobile number is already exists.']},
    "department": { type: String, required: true},
    "role": { type: String, required: true},
    "Joining": { type: String, required: true}
})

module.exports = mongoose.model('emp', employee)
