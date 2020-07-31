const express = require('express');
const router = express.Router();


const Item = require('../../models/item.js');
const Order = require('../../models/order.js');
const CompletedOrder = require('../../models/completedOrder.js');
const Category = require('../../models/category.js');
const User = require('../../models/user.js');

router.get('/', (req, res) => {
    Item.find().sort().then(items => res.json(items))
})

router.get('/users', (req, res) => {
    User.find().then(items => res.json(items))
})

router.post('/users', (req, res) => {
    newUser = new User({
        name: req.body.name,
        type: req.body.type,
        restId: req.body.restId,
        password: req.body.password,
        adress: req.body.adress,
        worktime: req.body.worktime,
        login: req.body.login
    });

    newUser.save().then(item => res.json(item));
})

router.post('/del_user', (req, res) => {
    User.findByIdAndDelete(req.body._id, (error, result) => error ? res.send(error) : res.send(result));
})

router.get('/category', (req, res) => {
    Category.find().sort({name: 1}).then(items => res.json(items))

})

router.post('/category', (req, res) => {
    newCategory = new Category({
        name: req.body.name,
        weight: req.body.weight,
        modificators: req.body.modificators
    }),

    newCategory.save().then(item => res.json(item))
})

router.post('/category-edit-exist', (req, res) => {
    Category.findByIdAndUpdate(req.body._id, {name: req.body.name, weight: req.body.weight, modificators: req.body.modificators}, (error, result) => error ? res.send(error) : res.send(result))
})

router.post('/category-delete', (req, res) => {
    console.log(req.body);
    Category.findByIdAndDelete(req.body._id, (error, result) => error ? res.send(error) : res.send(result));
} )

router.get('/orders', (req, res) => {
    Order.find().sort().then(items => res.json(items))
})

router.post('/', (req, res) => {
    newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        price: req.body.price,
        available: req.body.available,
        category: req.body.category,
        resto: req.body.resto
    }),

    newItem.save().then(item => res.json(item))
})


router.post('/del', (req, res) => {
    Item.findByIdAndDelete(req.body._id, (error, result) => error ? res.send(error) : res.send(result))
});

router.post('/item-update', (req, res) => {
    Item.findByIdAndUpdate(req.body._id, {name: req.body.name, description: req.body.description, imgUrl: req.body.imgUrl, price: req.body.price, available: req.body.available, category: req.body.category, resto: req.body.resto}, (error, result) => {
        error ? res.send(error) : res.send(result)
    })
})

router.post('/update', (req, res) => {
    Order.findByIdAndUpdate(req.body.id, {accepted: true}, (error, result) => error ? res.send(error) : res.send(result));
});

router.post('/complete', (req, res) => {
    newCompletedOrder = new CompletedOrder({
        date: Date.now(),
        phone: req.body.phone,
        comment: req.body.comment,
        items: req.body.items,
        cost: req.body.cost,
        resto: req.body.resto
    })
    newCompletedOrder.save().then(item => res.json(item));
});

router.post('/orderdel', (req, res) => {
    Order.findByIdAndDelete(req.body.id, (error, result) => error ? res.send(error) : res.send(result));
})


module.exports = router;