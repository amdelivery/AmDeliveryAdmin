const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompletedOrderSchema = new Schema ({
    date: String,
    resto: String,
    phone: String,
    comment: String,
    items: Array,
    cost: String,
    
})

module.exports = CompleteOrder = mongoose.model('complete-order', CompletedOrderSchema);