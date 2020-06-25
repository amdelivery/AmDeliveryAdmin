const express = require('express');
const router = express.Router();


const Item = require('../../models/item.js');
const Order = require('../../models/order.js');

router.get('/', (req, res) => {
    Item.find().sort().then(items => res.json(items))
})

router.get('/orders', (req, res) => {
    Order.find().sort().then(items => res.json(items))
})

router.post('/', (req, res) => {
    newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        avalaible: req.body.avalaible,
        category: {
            name: req.body.category.name,
            weight: req.body.category.weight
        }
    }),

    newItem.save().then(item => res.json(item))
})


router.post('/del', (req, res) => {
    Item.deleteMany().then(result => console.log(result))
});


module.exports = router;