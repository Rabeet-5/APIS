const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    course: {
        type:Number,
        required:true
    }
})

const StudentModel = mongoose.model('Students',StudentSchema);

module.exports = StudentModel;