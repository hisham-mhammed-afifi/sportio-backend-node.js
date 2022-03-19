const mongoose = require ('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Category Name is required"],
        maxlength:20
    }


})
 module.exports = mongoose.model('Category',categorySchema)
