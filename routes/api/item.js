const express = require('express');
const router = express.Router();


const Item = require('../../models/item.js');
const Order = require('../../models/order.js');
const CompletedOrder = require('../../models/completedOrder.js');

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

router.post('/update', (req, res) => {
    Order.findByIdAndUpdate(req.body.id, {accepted: true}, (error, result) => error ? res.send(error) : res.send(result));
});

router.post('/complete', (req, res) => {
    newCompletedOrder = new CompletedOrder({
        date: Date.now(),
        adress: req.body.adress,
        phone: req.body.phone,
        comment: req.body.comment,
        items: req.body.items,
        cost: req.body.cost,
    })
    newCompletedOrder.save().then(item => res.json(item));
});

router.post('/orderdel', (req, res) => {
    Order.findByIdAndDelete(req.body.id, (error, result) => error ? res.send(error) : res.send(result));
})


module.exports = router;