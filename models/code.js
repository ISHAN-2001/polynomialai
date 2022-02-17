const mongoose = require("mongoose");

let codeSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    code: {
        type: String,
        required:true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("Code",codeSchema);