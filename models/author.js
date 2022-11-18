const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    name: String,
    age: Number,
    authorId: String,
})

module.exports = mongoose.model('Author', authorSchema)
// Model referes to a collection in Database {obj inside of it schema}
//  