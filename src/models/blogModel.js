const mongoose = require('mongoose');

const ObjectId= mongoose.Types.ObjectId

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: `Blog title is required`,
        trim:true
    },
    body: {
        type: String,
        required: `Blog body is required`,
        trim:true
    },
    authorId: {
        type: ObjectId,
        ref: "newAuthor",
        required:`Blog author is required`
    },
    tags: [{type:String, trim:true}],
    category: {
        type: String,
        required: `Blog category is required`,
        trim:true
    },
    subCategory: [{type:String, trim:true}],
    isDeleted: {
        type: Boolean,
        default: false
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    deletedAt: {
                type:Date,
                default:null
            },
    publishedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

 module.exports = mongoose.model("blog",blogSchema)