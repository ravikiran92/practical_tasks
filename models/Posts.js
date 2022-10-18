const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title : {
        type:String
    },
    body:{
        type:String
    },
    createdBy:{
        type:String
    },
    active: 
        { 
        type: Boolean
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    },

})

const postModal = mongoose.model('posts',postSchema)

module.exports = postModal