const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    author: String,
    price: Number
    
    
});


module.exports = mongoose.model('Book', bookSchema);