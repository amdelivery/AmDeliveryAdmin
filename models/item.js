const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema ({
    name: String,
    description: String,
    imgUrl: String,
    price: String,
    available: String,
    category: String,
    resto: String
})

module.exports = Item = mongoose.model('menuitem', ItemSchema);