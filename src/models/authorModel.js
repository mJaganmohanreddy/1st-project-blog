const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    fname: {
        type:String,
        required:`First name is required`,
        trim:true
    },
    lname: {
        type:String,
        required:`Last name is required`,
        trim:true
    },

    title : {
        type:String,
        enum:['Mr','Mrs','Miss','Mast'],
        required:`Tittle is required`,
    },

    email : {
        type:String,
        required:`Email is required`,
        unique:true,
     
    },

    password: {
        type:String,
        trim:true,
        required:`password is requred`
    }

}, { timestamps: true });

module.exports = mongoose.model('newAuthor', authorSchema)