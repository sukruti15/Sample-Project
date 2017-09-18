var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    Student1: {
        rollno: String,
        fname: String,
        lname: String
    }
});
module.exports = mongoose.model('Student1', studentSchema);
